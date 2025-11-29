pipeline {
    agent any

    environment {
        NODE_VERSION = '22.20.0'
        PLAYWRIGHT_DOCKER = 'mcr.microsoft.com/playwright:v1.56.1-jammy'
    }

    options {
        timestamps()
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install & Run Playwright Tests') {
            steps {
                script {
                    docker.image("${PLAYWRIGHT_DOCKER}").inside {
                        sh '''
                            echo "Node version:"
                            node -v
                            echo "Installing dependencies..."
                            npm ci

                            echo "Running Playwright tests..."
                            npx playwright test --reporter=html
                            # Ya no hace falta copiar, el contenedor comparte el workspace
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            echo "Archiving artifacts..."
            archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true

            echo "Publishing HTML report..."
            publishHTML(target: [
                allowMissing: true,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report'
            ])
        }
    }
}
