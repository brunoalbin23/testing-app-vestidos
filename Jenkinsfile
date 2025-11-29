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
                    // Revisar que Docker esté disponible
                    sh "docker inspect -f . ${DOCKER_IMAGE} || echo 'Docker image available'"

                    // Ejecutar tests dentro del contenedor
                    docker.image(DOCKER_IMAGE).inside('-u 0:0 -w $WORKSPACE --ipc=host') {
                        sh '''
                            echo Node version:
                            node -v
                            echo Installing dependencies...
                            npm ci
                            echo Running Playwright tests...
                            npx playwright test --reporter=html
                        '''
                    }
                }
            }
        }

        stage('Post Test Actions') {
            steps {
                script {
                    // Verificar que el reporte exista
                    if (fileExists('playwright-report/index.html')) {
                        echo "Playwright report exists"
                    } else {
                        error "Playwright report not found!"
                    }
                }
            }
        }

        stage('Archive & Publish Report') {
            steps {
                // Archivar artefactos
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

                // Publicar reporte HTML con scripts permitidos
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report'
                ])
            }
        }
    }

    post {
        always {
            echo "Pipeline finished"
        }
    }
}
