pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
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
                script {
                    // Usar la imagen oficial de Playwright
                    docker.image('mcr.microsoft.com/playwright:v1.56.1-jammy').inside {
                        // Instalar dependencias (por si no están)
                        sh 'npm ci'
                        // Correr tests y generar reporte HTML
                        sh 'npx playwright test --reporter=html --output=playwright-report'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Archiving Playwright report...'
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report',
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true
            ])
        }

        success {
            echo 'Pipeline completado con éxito'
        }

        failure {
            echo 'Pipeline falló'
        }
    }
}
