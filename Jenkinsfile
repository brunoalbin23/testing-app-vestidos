pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        PLAYWRIGHT_REPORT_DIR = 'playwright-report'
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
                // Ejecuta los tests con Playwright y genera reporte HTML
                sh 'npx playwright test --reporter=html --output=$PLAYWRIGHT_REPORT_DIR'
            }
        }
    }

    post {
        always {
            echo "Archiving Playwright report..."
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: "${PLAYWRIGHT_REPORT_DIR}",
                reportFiles: 'index.html',
                reportName: 'Playwright Report'
            ])
        }
        success {
            echo "Pipeline finalizó correctamente ✅"
        }
        failure {
            echo "Pipeline falló ❌"
        }
    }
}
