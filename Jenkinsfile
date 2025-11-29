pipeline {
  agent any

  options {
    timestamps()
  }

  stages {
    stage('Playwright tests') {
      steps {
        script {
          docker.image('mcr.microsoft.com/playwright:v1.56.1-jammy')
            .inside('--ipc=host -u 0:0') {

              sh '''
                echo "Node version:"
                node -v

                echo "Installing dependencies..."
                npm ci

                echo "Running Playwright tests..."
                npx playwright test
              '''

              publishHTML([
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: false
              ])
          }
        }
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
