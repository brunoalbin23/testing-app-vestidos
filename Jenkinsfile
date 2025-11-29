pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'mcr.microsoft.com/playwright:v1.56.1-jammy'
        WORKSPACE_DIR = "${env.WORKSPACE}"
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
                    // Revisamos que Docker esté disponible
                    sh "docker inspect -f . ${DOCKER_IMAGE}"

                    // Ejecutamos dentro de contenedor Docker
                    docker.image(DOCKER_IMAGE).inside("-u 0:0 -w ${WORKSPACE_DIR} --ipc=host") {
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
                    // Copiar reporte al workspace (por si acaso)
                    sh '''
                        if [ -d playwright-report ]; then
                            echo "Playwright report exists"
                        else
                            echo "Playwright report missing!"
                        fi
                    '''
                }
            }
        }
    }

    post {
        always {
            echo "Archiving artifacts..."
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true

            echo "Publishing HTML report..."
            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true
            ])
        }

        failure {
            echo "Tests failed! Check screenshots and report."
        }
    }
}
