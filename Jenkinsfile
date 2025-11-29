pipeline {
    agent any

    stages {
        stage('Install & Run Playwright Tests') {
            agent {
                docker { image 'mcr.microsoft.com/playwright:v1.56.1-jammy' }
            }
            steps {
                sh 'npm ci'
                sh 'npm run build'
                sh 'npm run start &'
                sh 'sleep 10'
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
