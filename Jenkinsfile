pipeline {
    agent any

    environment {
        // Deshabilitar CSP para poder ver reportes HTML sin bloqueos
        JAVA_OPTS = '-Dhudson.model.DirectoryBrowserSupport.CSP='
    }

    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing all dependencies (including devDependencies)...'
                sh 'npm ci --include=dev'
            }
        }

        stage('Build App') {
            steps {
                echo 'Building Next.js app...'
                sh 'npm run build'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                echo 'Running Playwright tests...'
                // Usamos HTML reporter sin opciones adicionales
                sh 'npx playwright test --reporter=html --output=playwright-report'
            }
        }
    }

    post {
        always {
            echo 'Archiving Playwright report...'
            publishHTML([
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                allowMissing: true,
                alwaysLinkToLastBuild: true
            ])
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
