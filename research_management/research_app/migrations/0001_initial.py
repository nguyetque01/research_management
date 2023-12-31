# Generated by Django 4.2.3 on 2023-09-30 16:06

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(max_length=100, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('role', models.CharField(choices=[('user', 'Người dùng'), ('manager', 'Người quản lý khoa học'), ('admin', 'Quản trị viên')], max_length=20)),
                ('full_name', models.CharField(max_length=255)),
                ('birthday', models.DateField()),
                ('gender', models.CharField(choices=[('male', 'Nam'), ('female', 'Nữ')], max_length=10)),
                ('phone', models.CharField(blank=True, max_length=15, null=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('profile_image', models.ImageField(blank=True, null=True, upload_to='profile_images/')),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='AcademicYear',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('file', models.FileField(upload_to='files/')),
                ('type', models.CharField(max_length=100)),
                ('size', models.PositiveIntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='LeadUnit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Level',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ResearchActivity',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, unique=True)),
                ('total_hours', models.IntegerField(null=True)),
                ('academic_year', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.academicyear')),
                ('lead_unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.leadunit')),
                ('level', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.level')),
            ],
        ),
        migrations.CreateModel(
            name='ResearchActivityCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='ResearchResource',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('description', models.TextField()),
                ('authors', models.CharField(max_length=255)),
                ('created_date', models.DateField(auto_now_add=True)),
                ('type', models.CharField(max_length=100)),
                ('url', models.URLField(blank=True)),
                ('attachments', models.ManyToManyField(blank=True, to='research_app.file')),
                ('creator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ResearchTopic',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('approved_budget', models.IntegerField()),
                ('approved_hours', models.IntegerField()),
                ('completion_status', models.CharField(choices=[('in_progress', 'Đang thực hiện'), ('completed', 'Đã hoàn thành')], max_length=20)),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchactivity')),
                ('authors', models.ManyToManyField(related_name='research_topics', to=settings.AUTH_USER_MODEL)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchactivitycategory')),
                ('research_resources', models.ManyToManyField(null=True, to='research_app.researchresource')),
            ],
        ),
        migrations.CreateModel(
            name='ResearchType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('researchresource_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='research_app.researchresource')),
                ('journal_name', models.CharField(max_length=255)),
                ('issn_isbn', models.CharField(max_length=20)),
                ('classification', models.CharField(max_length=100)),
                ('published_date', models.DateField()),
                ('published_type', models.CharField(max_length=100)),
            ],
            bases=('research_app.researchresource',),
        ),
        migrations.CreateModel(
            name='PublishedBook',
            fields=[
                ('researchresource_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='research_app.researchresource')),
                ('publisher', models.CharField(max_length=255)),
                ('published_date', models.DateField()),
                ('isbn', models.CharField(max_length=20, unique=True)),
                ('field_of_study', models.CharField(max_length=100)),
            ],
            bases=('research_app.researchresource',),
        ),
        migrations.CreateModel(
            name='ResearchAward',
            fields=[
                ('researchresource_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='research_app.researchresource')),
                ('award_level', models.CharField(choices=[('school', 'Trường'), ('province', 'Tỉnh'), ('ministry', 'Bộ'), ('government', 'Nhà nước'), ('international', 'Quốc tế')], max_length=20)),
                ('award_category', models.CharField(choices=[('participation', 'Tham gia'), ('mentorship', 'Hướng dẫn')], max_length=20)),
                ('award_rank', models.CharField(choices=[('first', 'Nhất'), ('second', 'Nhì'), ('third', 'Ba'), ('encouragement', 'Khuyến khích')], max_length=20)),
                ('award_received_date', models.DateField()),
            ],
            bases=('research_app.researchresource',),
        ),
        migrations.CreateModel(
            name='TechnologyTransferProject',
            fields=[
                ('researchresource_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='research_app.researchresource')),
                ('transfer_company', models.CharField(max_length=255)),
                ('transfer_contract_id', models.CharField(max_length=100, unique=True)),
                ('signed_contract_id', models.CharField(max_length=100, unique=True)),
                ('signed_contract_date', models.DateField()),
                ('contract_value', models.IntegerField()),
            ],
            bases=('research_app.researchresource',),
        ),
        migrations.CreateModel(
            name='ResearchTopicSubmission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('submission_date', models.DateField()),
                ('submission_approved_date', models.DateField(blank=True, null=True)),
                ('approval_status', models.CharField(choices=[('pending', 'Chờ duyệt'), ('approved', 'Đã duyệt'), ('rejected', 'Từ chối')], default='pending', max_length=20)),
                ('submission_approver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approved_submissions', to=settings.AUTH_USER_MODEL)),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchtopic')),
            ],
        ),
        migrations.CreateModel(
            name='ResearchTopicRegistration',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('registered_date', models.DateField()),
                ('assigned_role', models.CharField(max_length=255)),
                ('expected_budget', models.IntegerField()),
                ('expected_hours', models.IntegerField()),
                ('registration_approved_date', models.DateField(blank=True, null=True)),
                ('approval_status', models.CharField(choices=[('pending', 'Chờ duyệt'), ('approved', 'Đã duyệt'), ('rejected', 'Từ chối')], default='pending', max_length=20)),
                ('registrant', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('registration_approver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='approved_registrations', to=settings.AUTH_USER_MODEL)),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchtopic')),
            ],
        ),
        migrations.AddField(
            model_name='researchactivitycategory',
            name='research_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchtype'),
        ),
        migrations.AddField(
            model_name='researchactivity',
            name='research_type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchtype'),
        ),
        migrations.AddField(
            model_name='researchactivity',
            name='unit',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='research_app.unit'),
        ),
        migrations.CreateModel(
            name='AcademicProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('academic_degree', models.CharField(max_length=100)),
                ('position', models.CharField(max_length=100)),
                ('education_history', models.TextField()),
                ('work_history', models.TextField()),
                ('research_activities', models.TextField()),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='ResearchActivityDetail',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_hours', models.IntegerField()),
                ('activity', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchactivity')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.researchactivitycategory')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='research_app.unit')),
            ],
            options={
                'unique_together': {('activity', 'category')},
            },
        ),
    ]
