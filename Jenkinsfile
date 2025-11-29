pipeline {
  agent none

  options {
    skipDefaultCheckout(true)
  }

  stages {
    stage('Playwright tests') {
      agent {
        docker {
          image 'mcr.microsoft.com/playwright:v1.56.1-jammy'
          args '--ipc=host'
          reuseNode true
        }
      }

      steps {
        checkout scm

        sh '''
          node -v
          npm -v
          npm ci
          npx playwright test
        '''
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
  }
}
