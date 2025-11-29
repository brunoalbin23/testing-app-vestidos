pipeline {
  agent any

  stages {
    stage('Playwright tests (Docker)') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.48.0-jammy'
          args '-u pwuser'
        }
      }

      steps {
        sh '''
          node -v
          npm -v
          npm ci
          npx playwright test
        '''
      }
    }
  }

  post {
    always {
      publishHTML([
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report',
        allowMissing: true,
        keepAll: true,
        alwaysLinkToLastBuild: true
      ])
    }
  }
}
