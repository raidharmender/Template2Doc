#!/usr/bin/env python3
import requests
import time
import sys

def test_backend():
    """Test backend health and basic functionality"""
    print("Testing Backend...")
    
    # Test health endpoint
    try:
        response = requests.get("http://localhost:8000/health", timeout=10)
        if response.status_code == 200:
            print("✅ Backend health check passed")
        else:
            print(f"❌ Backend health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend health check failed: {e}")
        return False
    
    # Test offer letter endpoint
    try:
        response = requests.get("http://localhost:8000/api/offer-letter/all", timeout=10)
        if response.status_code == 200:
            print("✅ Backend offer letter endpoint working")
        else:
            print(f"❌ Backend offer letter endpoint failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Backend offer letter endpoint failed: {e}")
        return False
    
    print("✅ Backend tests passed")
    return True

def test_frontend():
    """Test frontend health and basic functionality"""
    print("\nTesting Frontend...")
    
    # Test health endpoint
    try:
        response = requests.get("http://localhost:3000/health", timeout=10)
        if response.status_code == 200:
            print("✅ Frontend health check passed")
        else:
            print(f"❌ Frontend health check failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend health check failed: {e}")
        return False
    
    # Test main page
    try:
        response = requests.get("http://localhost:3000/", timeout=10)
        if response.status_code == 200:
            print("✅ Frontend main page accessible")
        else:
            print(f"❌ Frontend main page failed: {response.status_code}")
            return False
    except requests.exceptions.RequestException as e:
        print(f"❌ Frontend main page failed: {e}")
        return False
    
    print("✅ Frontend tests passed")
    return True

def main():
    print("🚀 Testing Offer Letter Application")
    print("=" * 50)
    
    # Wait a bit for services to start
    print("Waiting for services to start...")
    time.sleep(5)
    
    backend_ok = test_backend()
    frontend_ok = test_frontend()
    
    print("\n" + "=" * 50)
    if backend_ok and frontend_ok:
        print("🎉 All tests passed! Application is running successfully.")
        print("\nAccess your application at:")
        print("Frontend: http://localhost:3000")
        print("Backend API: http://localhost:8000")
        print("Backend Health: http://localhost:8000/health")
        return 0
    else:
        print("❌ Some tests failed. Please check the logs above.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
