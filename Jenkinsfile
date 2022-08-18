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
                bat "npm install"
                bat 'npx cross-env-shell QASE_REPORT=1 QASE_API_TOKEN=%qaseApiToken% QASE_ENVIRONMENT_ID=1 NO_COLOR=1'
            }
        }
        stage('Testing'){
            steps{
                bat 'npx cypress run --e2e --browser chrome --spec \".\\cypress\\e2e\\login-page.cy.js\"'
            }
        }
        stage('Deploying'){
            steps{
                echo "Deploying started"
            }
        }
    }
}
