from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        if not username:
            raise ValueError("The Username field must be set")
        username = self.normalize_username(username)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(username, password, **extra_fields)

# User (Người dùng)
class CustomUser(AbstractBaseUser):
    username = models.CharField(max_length=30, unique=True)
    password = models.CharField(max_length=128)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=[('M', 'Nam'), ('F', 'Nữ')], null=True, blank=True)
    degree = models.CharField(max_length=100, null=True, blank=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)
    total_study_hours = models.PositiveIntegerField(default=0)
    is_approved = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["first_name", "last_name", "email"]

    def __str__(self):
        return self.username

# Research Topic (Đề tài nghiên cứu)
class ResearchTopic(models.Model):
    name = models.CharField(max_length=255)
    category = models.ForeignKey("Category", on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    study_hours = models.PositiveIntegerField()
    approval_status = models.CharField(max_length=20, choices=[("Pending", "Chưa kiểm phê duyệt"), ("Approved", "Đã kiểm phê duyệt")], default="Pending")
    study_status = models.CharField(max_length=20, choices=[("InProgress", "Đang tiến hành"), ("Completed", "Đã hoàn thành")], default="InProgress")
    # ...

# Research (Bài nghiên cứu)
class Research(models.Model):
    topic = models.ForeignKey(ResearchTopic, on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="authored_research")
    reviewer = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, blank=True, related_name="reviewed_research")
    release_date = models.DateField(null=True, blank=True)
    abstract = models.TextField(null=True, blank=True)
    keywords = models.CharField(max_length=255, null=True, blank=True)
    pdf_file = models.FileField(upload_to="research_pdfs/", null=True, blank=True)
    # ...

# Category (Danh mục)
class Category(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(upload_to="category_images/", null=True, blank=True)
    # ...

# Article (Bài viết)
class Article(models.Model):
    title = models.CharField(max_length=255)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    publication_date = models.DateField()
    image = models.ImageField(upload_to="article_images/", null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    keywords = models.CharField(max_length=255, null=True, blank=True)
    content = models.TextField()
    # ...

# Reference (Tài liệu tham khảo)
class Reference(models.Model):
    title = models.CharField(max_length=255)
    image = models.ImageField(upload_to="reference_images/", null=True, blank=True)
    url = models.URLField()
    # ...
