pipeline {
    agent any

    tools {
        nodejs '18.20.2' // Matches the name you configured in Global Tool Configuration
    }

    environment {
        GIT_REPO_URL = 'https://github.com/ali2307/PIPELINE.git'
        BRANCH = 'main'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: "${BRANCH}",
                    url: "${GIT_REPO_URL}",
                    credentialsId: 'c1a36322-d94b-49e7-886e-0c0314e3ad25'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install dependencies
                sh 'npm install'
            }
        }

        stage('Build Application') {
            steps {
                // Build the Next.js application
                sh 'npm run build'
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo 'Deployment steps can be added here if needed.'
            }
        }
    }

    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the logs for more details.'
        }
        always {
            cleanWs() // Clean up the workspace after the pipeline execution
        }
    }
}
