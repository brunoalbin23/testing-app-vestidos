pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.56.1-jammy'
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
                    docker.image(DOCKER_IMAGE).inside('-u 0:0 --ipc=host') {
                        sh '''
                            echo "Node version:"
                            node -v
                            
                            echo "Installing dependencies..."
                            npm ci
                            
                            echo "Running Playwright tests..."
                            npx playwright test --reporter=html
                        '''
                    }
                }
            }
        }

        stage('Post Test Actions') {
            steps {
                script {
                    // Verifica que la carpeta del reporte exista
                    sh '''
                        if [ -d "playwright-report" ]; then
                            echo "Playwright report exists"
                            chmod -R 755 playwright-report
                        else
                            echo "ERROR: Playwright report not found"
                            exit 1
                        fi
                    '''
                }
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',    // carpeta generada por Playwright
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
            }
        }
    }
}
