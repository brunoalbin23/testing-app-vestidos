pipeline {
    agent any

    stages {
        stage('Install & Test') {
            agent {
                docker { image 'mcr.microsoft.com/playwright:v1.56.1-jammy' }
            }
            steps {
                sh 'npm ci'
                sh 'npm run build'
                sh 'npx playwright test --reporter=html'
            }
        }
    }

    post {
        always {
            publishHTML([
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
        }
    }
}
