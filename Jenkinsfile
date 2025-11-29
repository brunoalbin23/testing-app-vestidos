pipeline {
    agent any

    environment {
        NODE_VERSION = '18'  // Ajusta según tu proyecto
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
                // Levanta un contenedor con Playwright
                docker.image('mcr.microsoft.com/playwright:v1.56.1-jammy').inside {
                    // Corre los tests
                    sh 'npm run start &'
                    sh 'sleep 10' // espera que el servidor esté listo
                    sh 'npx playwright test'
                }
            }
        }
    }

    post {
        always {
            // Publica el HTML report en Jenkins
            publishHTML([
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }

        failure {
            echo 'El pipeline falló'
        }

        success {
            echo 'Pipeline completado con éxito'
        }
    }
}
