pipeline {
  agent any

  options {
    timestamps()
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Playwright tests') {
      steps {
        script {
          docker.image('mcr.microsoft.com/playwright:v1.56.1-jammy')
            .inside('--ipc=host -u 0:0') {

            sh '''
              node -v
              npm ci
              npx playwright test --reporter=html
              ls -la playwright-report
            '''
          }
        }
      }
    }
  }

  post {
    always {
      publishHTML(target: [
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])

      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
    }
  }
}
