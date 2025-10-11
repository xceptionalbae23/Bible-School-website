import requests
import sys
import json
from datetime import datetime

class FocusedEmailValidationTester:
    def __init__(self, base_url="https://bible-institute-web.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, timeout=15)
            elif method == 'POST':
                # These endpoints expect form data
                response = requests.post(url, data=data, timeout=15)

            print(f"Response Status: {response.status_code}")
            
            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")

            try:
                response_data = response.json()
                print(f"Response: {json.dumps(response_data, indent=2)}")
                return success, response_data
            except:
                print(f"Response Text: {response.text[:200]}...")
                return success, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

def main():
    print("📧 WHIBC Email Uniqueness Validation - Focused Testing")
    print("=" * 60)
    
    tester = FocusedEmailValidationTester()
    
    # Generate unique test emails
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    student_email = f"test.student.{timestamp}@example.com"
    partnership_email = f"test.partnership.{timestamp}@example.com"
    
    print(f"\n📧 Test Emails:")
    print(f"Student Email: {student_email}")
    print(f"Partnership Email: {partnership_email}")
    
    # Test 1: Check email availability for new emails
    print("\n" + "="*50)
    print("📋 TEST 1: Email Availability Check for New Emails")
    print("="*50)
    
    success1, response1 = tester.run_test(
        "Check Student Email Availability (New)",
        "GET",
        f"api/check-email/{student_email}",
        200
    )
    
    success2, response2 = tester.run_test(
        "Check Partnership Email Availability (New)",
        "GET",
        f"api/check-email/{partnership_email}",
        200
    )
    
    # Test 2: Register student with first email
    print("\n" + "="*50)
    print("📋 TEST 2: Student Registration (Should Succeed)")
    print("="*50)
    
    student_data = {
        "full_name": "Test Student",
        "date_of_birth": "1990-01-15",
        "gender": "Male",
        "address": "123 Test Street",
        "email": student_email,
        "phone_number": "+1234567890",
        "educational_background": "Bachelor's Degree",
        "program_applied": "Certificate in Biblical Studies",
        "study_mode": "Online"
    }
    
    success3, response3 = tester.run_test(
        "Student Registration (First Time)",
        "POST",
        "api/register-student",
        200,
        data=student_data
    )
    
    # Test 3: Submit partnership with second email
    print("\n" + "="*50)
    print("📋 TEST 3: Partnership Submission (Should Succeed)")
    print("="*50)
    
    partnership_data = {
        "organization_name": "Test Organization",
        "contact_person": "Test Contact",
        "email": partnership_email,
        "phone_number": "+1987654321",
        "partnership_type": "Ministry Support",
        "message": "Test partnership message"
    }
    
    success4, response4 = tester.run_test(
        "Partnership Submission (First Time)",
        "POST",
        "api/submit-partnership",
        200,
        data=partnership_data
    )
    
    # Test 4: Check email availability after registrations
    print("\n" + "="*50)
    print("📋 TEST 4: Email Availability Check After Registrations")
    print("="*50)
    
    success5, response5 = tester.run_test(
        "Check Student Email Availability (After Registration)",
        "GET",
        f"api/check-email/{student_email}",
        200
    )
    
    success6, response6 = tester.run_test(
        "Check Partnership Email Availability (After Submission)",
        "GET",
        f"api/check-email/{partnership_email}",
        200
    )
    
    # Test 5: Try duplicate student registration (should fail)
    print("\n" + "="*50)
    print("📋 TEST 5: Duplicate Student Registration (Should Fail)")
    print("="*50)
    
    duplicate_student_data = {
        "full_name": "Another Student",
        "date_of_birth": "1992-05-20",
        "gender": "Female",
        "address": "456 Test Avenue",
        "email": student_email,  # Same email as first student
        "phone_number": "+1234567891",
        "educational_background": "Master's Degree",
        "program_applied": "Diploma in Theology",
        "study_mode": "Hybrid"
    }
    
    success7, response7 = tester.run_test(
        "Student Registration (Duplicate Email)",
        "POST",
        "api/register-student",
        400,  # Should fail
        data=duplicate_student_data
    )
    
    # Test 6: Try duplicate partnership submission (should fail)
    print("\n" + "="*50)
    print("📋 TEST 6: Duplicate Partnership Submission (Should Fail)")
    print("="*50)
    
    duplicate_partnership_data = {
        "organization_name": "Another Organization",
        "contact_person": "Another Contact",
        "email": partnership_email,  # Same email as first partnership
        "phone_number": "+1987654322",
        "partnership_type": "Scholarship Funding",
        "message": "Another partnership message"
    }
    
    success8, response8 = tester.run_test(
        "Partnership Submission (Duplicate Email)",
        "POST",
        "api/submit-partnership",
        400,  # Should fail
        data=duplicate_partnership_data
    )
    
    # Test 7: Cross-validation - Try to use student email for partnership (should fail)
    print("\n" + "="*50)
    print("📋 TEST 7: Cross-validation - Student Email for Partnership (Should Fail)")
    print("="*50)
    
    cross_partnership_data = {
        "organization_name": "Cross Test Organization",
        "contact_person": "Cross Test Contact",
        "email": student_email,  # Using student email for partnership
        "phone_number": "+1987654323",
        "partnership_type": "Academic Partnership",
        "message": "Cross validation test"
    }
    
    success9, response9 = tester.run_test(
        "Partnership with Student Email (Cross-validation)",
        "POST",
        "api/submit-partnership",
        400,  # Should fail
        data=cross_partnership_data
    )
    
    # Test 8: Cross-validation - Try to use partnership email for student (should fail)
    print("\n" + "="*50)
    print("📋 TEST 8: Cross-validation - Partnership Email for Student (Should Fail)")
    print("="*50)
    
    cross_student_data = {
        "full_name": "Cross Test Student",
        "date_of_birth": "1988-03-10",
        "gender": "Male",
        "address": "789 Cross Test Street",
        "email": partnership_email,  # Using partnership email for student
        "phone_number": "+1234567892",
        "educational_background": "PhD",
        "program_applied": "Master of Divinity",
        "study_mode": "On-campus"
    }
    
    success10, response10 = tester.run_test(
        "Student Registration with Partnership Email (Cross-validation)",
        "POST",
        "api/register-student",
        400,  # Should fail
        data=cross_student_data
    )
    
    # Print final results
    print(f"\n📊 Final Results:")
    print(f"Tests Run: {tester.tests_run}")
    print(f"Tests Passed: {tester.tests_passed}")
    print(f"Tests Failed: {tester.tests_run - tester.tests_passed}")
    print(f"Success Rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    # Summary of critical issues
    print(f"\n🔍 Critical Issues Found:")
    issues = []
    
    if success9 and response9.get('status') == 'success':
        issues.append("❌ Partnership submission with student email should fail but succeeded")
    
    if success10 and response10.get('status') == 'success':
        issues.append("❌ Student registration with partnership email should fail but succeeded")
    
    if not issues:
        print("✅ No critical issues found - email uniqueness validation working correctly")
    else:
        for issue in issues:
            print(issue)
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print("⚠️  Some tests failed. Check the details above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())