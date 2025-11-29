pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.56.1-jammy'
            args '-u 0:0' // correr como root dentro del contenedor
        }
    }

    environment {
        NODE_VERSION = '18'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npm run start &'
                sh 'sleep 10'
                sh 'npx playwright test --reporter=html'
            }
        }
    }

    post {
        always {
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
            ])
        }
        failure { echo 'Pipeline falló' }
        success { echo 'Pipeline completado con éxito' }
    }
}
