pipeline{
    agent any
    options {
        ansiColor('xterm')
    }
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
                bat "npx cross-env QASE_REPORT=1 QASE_API_TOKEN=$qaseApiToken QASE_ENVIRONMENT_ID=1 NO_COLOR=1 cypress run --e2e --browser chrome --spec \".\\cypress\\e2e\\login-page.cy.js\""
            }
        }
        stage('Deploying'){
            steps{
                echo "Deploying started"
            }
        }
    }
}
