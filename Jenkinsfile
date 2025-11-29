pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/brunoalbin23/testing-app-vestidos.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test --reporter=html'
            }
        }
    }

    post {
        always {
            publishHTML([
                allowMissing: false,                // si no encuentra el HTML, falla
                alwaysLinkToLastBuild: true,        // siempre enlaza al último build
                keepAll: true,                       // guarda todos los reportes
                reportDir: 'playwright-report',      // carpeta donde Playwright genera el HTML
                reportFiles: 'index.html',           // archivo HTML a publicar
                reportName: 'Playwright Report'      // nombre visible en Jenkins
            ])
        }
    }
}
