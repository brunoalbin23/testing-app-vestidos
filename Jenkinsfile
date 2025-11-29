pipeline {
  agent any

  stages {

    stage('Install & Playwright Tests (Docker)') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.48.0-jammy'
          args '-u pwuser'
        }
      }

      steps {
        sh '''
          npm ci
          npx playwright install --with-deps
          npx playwright test
        '''
      }
    }
  }

  post {
    always {
      publishHTML([
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])
    }
  }
}
