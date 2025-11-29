pipeline {
  agent any

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Playwright Tests (Docker)') {
      steps {
        sh '''
          docker run --rm \
            -v "$PWD:/work" \
            -w /work \
            mcr.microsoft.com/playwright:v1.48.0-jammy \
            bash -c "npm ci && npx playwright test"
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
