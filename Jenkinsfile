pipeline{
    agent any

    environment{
        qaseApiToken = credentials('qaseApiToken')
    }

    stages{
        stage('Building'){
            steps{
                echo "Build started"
            }
        }
        stage('Testing'){
            steps{
                bat "npm i"
                bat "npm run cross-env QASE_REPORT=1 QASE_API_TOKEN=${qaseApiToken} QASE_ENVIRONMENT_ID=1 cypress run --e2e --browser chrome --spec cypress/e2e/login-page.cy"
            }
        }
        stage('Deploying'){
            steps{
                echo "Build started"
            }
        }
    }
}
