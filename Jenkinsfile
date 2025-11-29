pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/brunoalbin23/testing-app-vestidos.git', branch: 'main'
            }
        }

        stage('Install & Run Playwright Tests') {
            steps {
                // Usa la imagen oficial de Playwright (ya tiene Node)
                docker.image('mcr.microsoft.com/playwright:v1.56.1-jammy').inside {
                    sh 'npm ci'
                    sh 'npm run build'
                    sh 'npm run start &'
                    sh 'sleep 10'
                    sh 'npx playwright test --reporter=html'
                }
            }
        }
    }

    post {
        always {
            // Publica reporte HTML
            publishHTML(target: [
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: "Playwright Report"
            ])
        }
    }
}
