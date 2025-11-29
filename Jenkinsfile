pipeline {
    agent any

    environment {
        REPORT_DIR = "playwright-report"
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/brunoalbin23/testing-app-vestidos.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                npm ci
                '''
            }
        }

        stage('Build App') {
            steps {
                sh '''
                npm run build
                '''
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh '''
                npx playwright test --reporter=html --output=${REPORT_DIR} --reporter-options open=false
                '''
            }
        }
    }

    post {
        always {
            echo "Archiving Playwright report..."
            publishHTML([
                reportName: 'Playwright Report',
                reportDir: "${REPORT_DIR}",
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
        }

        failure {
            echo "Pipeline falló"
        }
    }
}
