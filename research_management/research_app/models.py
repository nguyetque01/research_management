from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models

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


class CustomUser(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(unique=True, max_length=30)
    password = models.CharField(max_length=128)
    full_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=[("male", "Nam"), ("female", "Nữ")])
    phone_number = models.CharField(max_length=15)
    address = models.TextField(null=True)
    profile_picture = models.ImageField(upload_to="profile_pictures/", null=True, blank=True)
    role = models.CharField(max_length=20, choices=[("member", "Thành viên"), ("admin", "Quản trị viên"), ("approver", "Người kiểm duyệt")])
    is_active = models.BooleanField(default=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    def __str__(self):
        return self.username
    
# Lớp Lý lịch khoa học (AcademicProfile)
class AcademicProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    academic_degree = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    education_history = models.TextField()
    work_history = models.TextField()
    research_activities = models.TextField()

# Lớp Đề tài nghiên cứu (ResearchTopic)
class ResearchTopic(models.Model):
    topic_name = models.CharField(max_length=200)
    funding_level = models.CharField(max_length=50)
    research_type = models.CharField(max_length=100)
    lead_unit = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    team_members = models.TextField(null=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    approval_date = models.DateField(null=True, blank=True)
    approved_budget = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    status = models.CharField(max_length=20, choices=[("completed", "Đã hoàn thành"), ("in_progress", "Đang thực hiện"), ("not_started", "Chưa thực hiện")])
    attachments = models.FileField(upload_to="research_topic_attachments/", null=True, blank=True)
    academic_year = models.CharField(max_length=10, null=True)
    research_hours = models.PositiveIntegerField(null=True)

# Lớp Phiếu đề xuất đề tài nghiên cứu (ResearchProposalForm)
class ResearchProposalForm(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    research_topic_id = models.PositiveIntegerField()
    submission_date = models.DateField()
    status = models.CharField(max_length=20, choices=[("pending", "Chờ duyệt"), ("approved", "Đã duyệt"), ("rejected", "Từ chối"), ("in_progress", "Đang thực hiện"), ("completed", "Hoàn thành")])
    approver_id = models.PositiveIntegerField()
    approval_date = models.DateField(null=True, blank=True)

# Lớp Phiếu đăng ký đề tài nghiên cứu (ResearchTopicRegistrationForm)
class ResearchTopicRegistrationForm(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    research_topic_id = models.PositiveIntegerField()
    assigned_role = models.CharField(max_length=100)
    registration_date = models.DateField()
    status = models.CharField(max_length=20, choices=[("pending", "Chờ duyệt"), ("approved", "Đã duyệt"), ("rejected", "Từ chối"), ("in_progress", "Đang thực hiện"), ("completed", "Hoàn thành")])
    approver_id = models.PositiveIntegerField()
    approval_date = models.DateField(null=True, blank=True)

# Lớp Phiếu kê khai hoạt động nghiên cứu (ResearchActivityDeclarationForm)
class ResearchActivityDeclarationForm(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    activity_id = models.PositiveIntegerField()
    activity_type = models.CharField(max_length=100)
    assigned_role = models.CharField(max_length=100)
    academic_year = models.CharField(max_length=10)
    declaration_date = models.DateField()
    approval_date = models.DateField(null=True, blank=True)
    approver_id = models.PositiveIntegerField()
    research_hours = models.PositiveIntegerField()
    submission_date = models.DateField()
    status = models.CharField(max_length=20, choices=[("pending", "Chờ duyệt"), ("approved", "Đã duyệt"), ("rejected", "Từ chối"), ("in_progress", "Đang thực hiện"), ("completed", "Hoàn thành")])

# Lớp Bài báo/báo cáo đăng trong tạp chí/kỷ yếu (JournalPublication)
class JournalPublication(models.Model):
    publication_title = models.CharField(max_length=200)
    journal_name = models.CharField(max_length=200)
    issn_isbn = models.CharField(max_length=20)
    classification = models.CharField(max_length=100)
    publication_date = models.DateField()
    publication_type = models.CharField(max_length=100)
    authors = models.TextField()
    attachments = models.FileField(upload_to="journal_publication_attachments/")
    url = models.URLField()

# Lớp Đề tài chuyển giao công nghệ (TechnologyTransferProject)
class TechnologyTransferProject(models.Model):
    project_title = models.CharField(max_length=200)
    authors = models.TextField()
    transfer_company = models.CharField(max_length=200)
    transfer_contract_id = models.CharField(max_length=50)
    signed_contract_id = models.CharField(max_length=50)
    contract_value = models.DecimalField(max_digits=10, decimal_places=2)
    contract_signing_date = models.DateField()
    attachments = models.FileField(upload_to="technology_transfer_project_attachments/")

# Lớp Sách do NXB phát hành (PublishedBook)
class PublishedBook(models.Model):
    book_title = models.CharField(max_length=200)
    authors = models.TextField()
    publisher = models.CharField(max_length=200)
    publication_date = models.DateField()
    isbn = models.CharField(max_length=20)
    field_of_study = models.CharField(max_length=100)
    attachments = models.FileField(upload_to="published_book_attachments/")

# Lớp Giải thưởng NCKH (ResearchAward)
class ResearchAward(models.Model):
    award_title = models.CharField(max_length=200)
    award_level = models.CharField(max_length=50)
    award_category = models.CharField(max_length=100)
    authors = models.TextField()
    award_rank = models.CharField(max_length=20, choices=[("first", "Nhất"), ("second", "Nhì"), ("third", "Ba"), ("encouragement", "Khuyến khích")])
    award_received_date = models.DateField()
    attachments = models.FileField(upload_to="research_award_attachments/")