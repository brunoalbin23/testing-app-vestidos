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
              npx playwright test
            '''
          }
        }
      }
    }
  }

  post {
    always {
      // ✅ Publicar HTML report de Playwright
      publishHTML(target: [
        allowMissing: false,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])

      // ✅ Archivar el reporte como artefacto
      archiveArtifacts artifacts: 'playwright-report/**', fingerprint: true
    }
  }
}
