pipeline{
    agent any

    options{
        ansiColor('xterm')
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
            }
        }
        stage('Deploying'){
            steps{
                echo "Build started"
            }
        }
    }
}