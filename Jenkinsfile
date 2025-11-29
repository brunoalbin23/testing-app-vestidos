pipeline {
    agent any

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    // Corre Playwright en contenedor
                    sh """
                    docker run --rm \
                      -v \$WORKSPACE:/workspace \
                      -w /workspace \
                      -e CI=true \
                      mcr.microsoft.com/playwright:v1.56.1-jammy \
                      bash -c "npm ci && npx playwright test --reporter=html"
                    """
                }
            }
        }

        stage('Archive & Publish Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Report',
                    keepAll: true
                ])
            }
        }
    }

    post {
        always {
            // Publicar el reporte de Playwright
            publishHTML([
                allowMissing: false,                 // Falla si no se encuentra el reporte
                alwaysLinkToLastBuild: true,         // Siempre enlaza al último build
                keepAll: true,                        // Mantiene todos los reportes
                reportDir: 'playwright-report',       // Carpeta donde se generó el HTML
                reportFiles: 'index.html',            // Archivo HTML a publicar
                reportName: 'Playwright Report'       // Nombre que verá en Jenkins
            ])
        }
    }
}
