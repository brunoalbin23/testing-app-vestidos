pipeline {
  agent any

  stages {
    stage('Playwright tests') {
      steps {
        script {
          docker.image('mcr.microsoft.com/playwright:v1.48.0-jammy')
            .inside('--ipc=host') {

              sh '''
                npm ci
                npx playwright install --with-deps
                npx playwright test
              '''
            }
        }
      }
    }
  }

  post {
    always {
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report',
        keepAll: true,
        alwaysLinkToLastBuild: true,
        allowMissing: true
      ])
    }
  }
}
