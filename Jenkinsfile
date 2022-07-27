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
                bat "npm install"
                bat "npm run test:qase"
                bat "cross-env QASE_REPORT=1 QASE_API_TOKEN=${qaseApiToken} QASE_ENVIRONMENT_ID=1 npm cypress run --e2e --browser chrome"
            }
        }
        stage('Deploying'){
            steps{
                echo "Build started"
            }
        }
    }
}
