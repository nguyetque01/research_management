import os
import django
from datetime import date

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "research_management.settings")
django.setup()

from research_app.models import Category, CustomUser, ResearchTopic,  Research, Article, Reference

def create_users():
    users = [
        {
            "username": "user1",
            "password": "password",
            "first_name": "Nguyễn Văn",
            "last_name": "A",
            "birth_date": "1995-01-15",
            "gender": "M",
            "degree": "Bachelors in Computer Science",
            "email": "nguyenvana@example.com",
            "phone": "123456789",
            "address": "123 Main St, City",
            "avatar": "avatar.jpg",
            "total_study_hours": 100,
            "reviewer": False,
        },
        {
            "username": "reviewer1",
            "password": "password",
            "first_name": "Trần Thị",
            "last_name": "B",
            "birth_date": "1998-05-20",
            "gender": "F",
            "degree": "Masters in Engineering",
            "email": "tranthib@example.com",
            "phone": "987654321",
            "address": "456 Elm St, Town",
            "avatar": "avatar.jpg",
            "total_study_hours": 150,
            "reviewer": True,
        },
        # Add more users as needed
    ]

    for user_data in users:
        user = CustomUser.objects.create_user(**user_data)
        print(f"Created user: {user.username}")

def create_categories():
    categories = [
        {"name": "Công nghệ phần mềm", "image": "software_tech.jpg"},
        {"name": "Khoa học máy tính", "image": "computer_science.jpg"},
        {"name": "Kỹ thuật máy tính", "image": "computer_engineering.jpg"},
        {"name": "Trí tuệ nhân tạo và Robotics", "image": "ai_robotics.jpg"},
        {"name": "Mạng máy tính và truyền thông dữ liệu", "image": "networking.jpg"},
        {"name": "An toàn thông tin", "image": "security.jpg"},
        {"name": "Hệ thống quản lý thông tin", "image": "information_mgmt.jpg"},
        {"name": "Big Data và Machine Learning", "image": "bigdata_ml.jpg"},
    ]

    for category_data in categories:
        category = Category.objects.create(**category_data)
        print(f"Created category: {category.name}")


def create_research_topics():
    topics = [
        {
            "name": "Ứng dụng công nghệ Blockchain trong xác minh thông tin quá trình học tập của du học sinh Lào",
            "category": Category.objects.get(name="Công nghệ phần mềm"),
            "study_hours": 60,
        },
        {
            "name": "Phát triển kỹ thuật trực quan hóa bảo mật ứng dụng Web",
            "category": Category.objects.get(name="An toàn thông tin"),
            "study_hours": 70,
        },
        {
            "name": "Kỹ thuật nặc danh hóa dữ liệu",
            "category": Category.objects.get(name="An toàn thông tin"),
            "study_hours": 50,
        },
        {
            "name": "Nhận dạng một số bệnh ngoài da bằng kỹ thuật học sâu",
            "category": Category.objects.get(name="Big Data và Machine Learning"),
            "study_hours": 90,
        },
        {
            "name": "Phân lớp văn bản dựa vào máy học và Facebook’s fastText",
            "category": Category.objects.get(name="Big Data và Machine Learning"),
            "study_hours": 55,
        },
        {
            "name": "Xây dựng chương trình phát hiện và rút trích văn bản từ hình ảnh trên thiết bị di động",
            "category": Category.objects.get(name="Công nghệ phần mềm"),
            "study_hours": 75,
        },
        {
            "name": "Đánh giá nhu cầu khai thác thông tin khoa học công nghệ hỗ trợ định hướng sản xuất trên lĩnh vực nông nghiệp",
            "category": Category.objects.get(name="Khoa học máy tính"),
            "study_hours": 65,
        },
        {
            "name": "Ứng dụng Random Forest giúp phân ban lớp học trong trường trung học phổ thông",
            "category": Category.objects.get(name="Big Data và Machine Learning"),
            "study_hours": 70,
        },
    ]

    for topic_data in topics:
        research_topic = ResearchTopic.objects.create(**topic_data)
        print(f"Created research topic: {research_topic.name}")

def create_researches():
    researches = [
        {
            "topic": ResearchTopic.objects.get(name="Ứng dụng công nghệ Blockchain trong xác minh thông tin quá trình học tập của du học sinh Lào"),
            "author": CustomUser.objects.get(username="user1"),
            "release_date": date(2023, 8, 1),
            "abstract": "This is an abstract of the research.",
            "keywords": "blockchain, education",
        },
        {
            "topic": ResearchTopic.objects.get(name="Rút trích thông tin trên các Chứng chỉ nghiệp vụ"),
            "author": CustomUser.objects.get(username="reviewer1"),
            "release_date": date(2023, 7, 15),
            "abstract": "This is another research abstract.",
            "keywords": "data extraction, certificates",
        },
    ]

    for research_data in researches:
        research = Research.objects.create(**research_data)
        print(f"Created research: {research.topic.name}")

def create_articles():
    articles = [
        {
            "title": "Introduction to Quantum Mechanics",
            "author": CustomUser.objects.get(username="john_doe"),
            "publication_date": date(2023, 8, 10),
            "image": "image.jpg",
            "category": Category.objects.get(name="Science"),
            "keywords": "quantum mechanics, physics",
            "content": "This is the content of the article...",
            
        },
        {
            "title": "Machine Learning Basics",
            "author": CustomUser.objects.get(username="jane_smith"),
            "publication_date": date(2023, 7, 20),
            "image": "image.jpg",
            "category": Category.objects.get(name="Technology"),
            "keywords": "machine learning, AI",
            "content": "This is the content of another article...",
        },
        # Add more articles as needed
    ]

    for article_data in articles:
        article = Article.objects.create(**article_data)
        print(f"Created article: {article.title}")

def create_references():
    references = [
        {"title": "Quantum Mechanics textbook", "url": "http://example.com/quantum-book", "image": "image.jpg"},
        {"title": "Introduction to Machine Learning", "url": "http://example.com/ml-book", "image": "image.jpg"},
        # Add more references as needed
    ]

    for reference_data in references:
        reference = Reference.objects.create(**reference_data)
        print(f"Created reference: {reference.title}")

if __name__ == "__main__":
    create_users()
    create_categories()
    create_research_topics()
    create_researches()
    create_articles()
    create_references()
