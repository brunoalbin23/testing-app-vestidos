pipeline {
    agent any

    environment {
        IMAGE_NAME = "mi-next-app"
        IMAGE_TAG = "latest"
        PLAYWRIGHT_IMAGE = "playwright-tests"
        CONTAINER_NAME = "next-app-ci"
        PORT = "3000"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/brunoalbin23/testing-app-vestidos'
            }
        }

        stage('Build App Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Run App Container') {
            steps {
                sh """
                    docker rm -f ${CONTAINER_NAME} || true
                    docker run -d --name ${CONTAINER_NAME} -p ${PORT}:3000 ${IMAGE_NAME}:${IMAGE_TAG}
                """
            }
        }

        stage('Wait for App') {
            steps {
                sh """
                    echo "Esperando a que la app responda..."
                    for i in {1..25}; do
                      if curl -s http://localhost:${PORT} > /dev/null; then
                        echo "App levantada!";
                        exit 0;
                      fi
                      sleep 2
                    done
                    echo "ERROR: La app no respondió"
                    docker logs ${CONTAINER_NAME}
                    exit 1
                """
            }
        }

        stage('Build Playwright Test Image') {
            steps {
                sh "docker build -t ${PLAYWRIGHT_IMAGE} -f Dockerfile.playwright ."
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh """
                    docker run --rm --network=host \
                        ${PLAYWRIGHT_IMAGE}
                """
            }
        }

        stage('Archive Playwright Report') {
            steps {
                sh "mkdir -p playwright-report"
                // Copiamos los reportes del contenedor al workspace
                sh """
                    docker create --name tmp ${PLAYWRIGHT_IMAGE}
                    docker cp tmp:/app/playwright-report ./playwright-report
                    docker rm tmp
                """
            }
        }
    }

    post {
        always {
            echo "Limpiando contenedores..."
            sh "docker rm -f ${CONTAINER_NAME} || true"

            publishHTML(target: [
                allowMissing: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright E2E Report'
            ])
        }
    }
}
