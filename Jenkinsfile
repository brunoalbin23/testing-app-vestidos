pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.56.1-jammy'
        REPORT_DIR = 'playwright-report'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm ci'
                    }
                }
            }
        }

        stage('Build App') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    docker.image(DOCKER_IMAGE).inside {
                        // Crear carpeta para reporte
                        sh "mkdir -p ${REPORT_DIR}"
                        // Modificar CSP del reporte HTML generado por Playwright
                        sh """
                        npx playwright test --reporter=html
                        sed -i "s/default-src \\*/default-src * data:/g" ${REPORT_DIR}/index.html
                        """
                    }
                }
            }
        }
    }

    post {
        always {
            // Publicar reporte HTML en Jenkins
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: REPORT_DIR,
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
    }
}
