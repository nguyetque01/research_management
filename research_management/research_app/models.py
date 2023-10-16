from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, username, email, password=None, role="User", **extra_fields):
        if not email:
            raise ValueError('Email address is required')
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, role=role, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, role="Admin", **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(username, email, password, role, **extra_fields)

# Người dùng (User)
class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ('user', 'Người dùng'),
        ('manager', 'Người quản lý khoa học'),
        ('admin', 'Quản trị viên'),
    )

    GENDER_CHOICES = (
        ('male', 'Nam'),
        ('female', 'Nữ'),
    )

    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    full_name = models.CharField(max_length=255)
    birthday = models.DateField()
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    profile_image = models.ImageField(upload_to='profile_images/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username

# Lý lịch khoa học (AcademicProfile)
class AcademicProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    academic_degree = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    education_history = models.TextField()
    work_history = models.TextField()
    research_activities = models.TextField()

    def __str__(self):
        return self.user.username

# Năm học (AcademicYear)
class AcademicYear(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
# Đơn vị tính (Unit)
class Unit(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
# Đơn vị chủ trì tính (LeadUnit)
class LeadUnit(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
# Cấp đề tài (Level)
class Level(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
# Loại hình nghiên cứu (ResearchType)
class ResearchType(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    
# Phân loại hoạt động nghiên cứu khoa học (ResearchActivityCategory)
class ResearchActivityCategory(models.Model):
    research_type = models.ForeignKey(ResearchType, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)

    def __str__(self):
        return f"{self.research_type.name} - {self.name}"

# Hoạt động nghiên cứu khoa học (ResearchActivity)
class ResearchActivity(models.Model):

    name = models.CharField(max_length=255, unique=True)
    academic_year = models.ForeignKey(AcademicYear, on_delete=models.CASCADE)
    level = models.ForeignKey(Level, on_delete=models.CASCADE)
    lead_unit = models.ForeignKey(LeadUnit, on_delete=models.CASCADE)
    research_type = models.ForeignKey(ResearchType, on_delete=models.CASCADE) 
    total_hours = models.IntegerField(null=True)
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE, null=True)
    
    def __str__(self):
        return self.name

# Chi tiết hoạt động nghiên cứu khoa học (ResearchActivityDetail)
class ResearchActivityDetail(models.Model):
    
    activity = models.ForeignKey(ResearchActivity, on_delete=models.CASCADE)
    category = models.ForeignKey(ResearchActivityCategory, on_delete=models.CASCADE)
    total_hours = models.IntegerField()
    unit = models.ForeignKey(Unit, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.activity.name} - {self.category.name}"
    
    class Meta:
        unique_together = ['activity', 'category']
    
# Đề tài nghiên cứu (ResearchTopic):
class ResearchTopic(models.Model):
    COMPLETION_STATUS_CHOICES = (
        ('in_progress', 'Đang thực hiện'),
        ('completed', 'Đã hoàn thành'),
    )

    name = models.CharField(max_length=255, null=True)
    activity = models.ForeignKey('ResearchActivity', on_delete=models.CASCADE)
    category = models.ForeignKey('ResearchActivityCategory', on_delete=models.CASCADE, null=True)
    authors = models.ManyToManyField(User, related_name='research_topics')
    description = models.CharField(max_length=255, null=True)
    abstract = models.CharField(max_length=255, null=True)
    approved_budget = models.IntegerField()
    approved_hours = models.IntegerField()
    completion_status = models.CharField(max_length=20, choices=COMPLETION_STATUS_CHOICES)
    research_resources = models.ManyToManyField('ResearchResource', null=True, blank=True)

    def __str__(self):
        return self.name
    
# Phiếu đăng ký đề tài nghiên cứu (ResearchTopicRegistration)
class ResearchTopicRegistration(models.Model):
    APPROVAL_STATUS_CHOICES = (
        ('pending', 'Chờ duyệt'),
        ('approved', 'Đã duyệt'),
        ('rejected', 'Từ chối'),
    )

    topic = models.ForeignKey(ResearchTopic, on_delete=models.CASCADE)
    registrant = models.ForeignKey(User, on_delete=models.CASCADE)
    registered_date = models.DateField(null=True, blank=True)
    assigned_role = models.CharField(max_length=255, null=True)
    author_position = models.CharField(max_length=255, null=True)
    expected_budget = models.IntegerField()
    expected_hours = models.IntegerField()
    registration_approver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='approved_registrations',null=True)
    registration_approved_date = models.DateField(null=True, blank=True)
    approval_status = models.CharField(max_length=20, choices=APPROVAL_STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Registration #{self.pk}"

# Phiếu nộp đề tài nghiên cứu (ResearchTopicSubmission):
class ResearchTopicSubmission(models.Model):
    APPROVAL_STATUS_CHOICES = (
        ('pending', 'Chờ duyệt'),
        ('approved', 'Đã duyệt'),
        ('rejected', 'Từ chối'),
    )

    topic = models.ForeignKey(ResearchTopic, on_delete=models.CASCADE)
    submission_date = models.DateField()
    submission_approver = models.ForeignKey(User, on_delete=models.CASCADE, related_name='approved_submissions')
    submission_approved_date = models.DateField(null=True, blank=True)
    approval_status = models.CharField(max_length=20, choices=APPROVAL_STATUS_CHOICES, default='pending')

    def __str__(self):
        return f"Submission #{self.pk}"

# Tài nguyên nghiên cứu (ResearchResource)
class ResearchResource(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    authors = models.CharField(max_length=255)
    created_date = models.DateField(auto_now_add=True)
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=100)
    attachments = models.FileField(upload_to='pdfs/', null=True, blank=True)
    image = models.ImageField(upload_to='images/', null=True, blank=True)
    url = models.URLField(blank=True)

    def __str__(self):
        return self.title

# Lớp Bài báo/báo cáo đăng trong tạp chí/kỷ yếu (Article)
class Article(ResearchResource):
    journal_name = models.CharField(max_length=255)
    issn_isbn = models.CharField(max_length=20)
    classification = models.CharField(max_length=100)
    published_date = models.DateField()
    published_type = models.CharField(max_length=100)

    def __str__(self):
        return self.journal_name

# Lớp Đề tài chuyển giao công nghệ (TechnologyTransferProject)
class TechnologyTransferProject(ResearchResource):
    transfer_company = models.CharField(max_length=255)
    transfer_contract_id = models.CharField(max_length=100)
    signed_contract_id = models.CharField(max_length=100)
    signed_contract_date = models.DateField()
    contract_value = models.IntegerField()

    def __str__(self):
        return self.transfer_contract_id

# Sách do NXB phát hành (PublishedBook)
class PublishedBook(ResearchResource):
    publisher = models.CharField(max_length=255)
    published_date = models.DateField()
    isbn = models.CharField(max_length=20)
    field_of_study = models.CharField(max_length=100)

    def __str__(self):
        return self.isbn

# Giải thưởng NCKH (ResearchAward)
class ResearchAward(ResearchResource):
    AWARD_LEVEL_CHOICES = (
        ('school', 'Trường'),
        ('province', 'Tỉnh'),
        ('ministry', 'Bộ'),
        ('government', 'Nhà nước'),
        ('international', 'Quốc tế'),
    )

    AWARD_CATEGORY_CHOICES = (
        ('participation', 'Tham gia'),
        ('mentorship', 'Hướng dẫn'),
    )

    AWARD_RANK_CHOICES = (
        ('first', 'Nhất'),
        ('second', 'Nhì'),
        ('third', 'Ba'),
        ('encouragement', 'Khuyến khích'),
    )

    award_level = models.CharField(max_length=20, choices=AWARD_LEVEL_CHOICES)
    award_category = models.CharField(max_length=20, choices=AWARD_CATEGORY_CHOICES)
    award_rank = models.CharField(max_length=20, choices=AWARD_RANK_CHOICES)
    award_received_date = models.DateField()

    def __str__(self):
        return f"{self.award_level} - {self.award_category}"