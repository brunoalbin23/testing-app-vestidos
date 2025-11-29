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
                // Instalar dependencias
                sh 'npm ci'

                // Build y start en background
                sh 'npm run build'
                sh 'npm run start &'

                // Esperar unos segundos para que el server levante
                sh 'sleep 10'

                // Ejecutar los tests
                sh 'npx playwright test --reporter=html'
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
