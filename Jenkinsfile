// Jenkins credentials (Manage Jenkins > Credentials), kind "Username with password":
//   cf-dev-creds, cf-stag-creds, cf-prod-creds
def BASE_URLS = [
    dev : 'https://phoenixtest2.communityforce.com',   // TODO: real dev URL
    stag: 'https://phoenixtest2.communityforce.com',
    prod: 'https://CHANGE-ME.communityforce.com'       // TODO: real prod URL
]

pipeline {
    agent any

    parameters {
        choice(name: 'ENV', choices: ['stag', 'dev', 'prod'], description: 'Target environment')
        choice(name: 'SUITE', choices: ['all', 'smoke'], description: 'Run everything or only @smoke tests (prod always runs smoke)')
    }

    options {
        timestamps()
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        CI = 'true'
        ENV = "${params.ENV}"
        BASE_URL = "${BASE_URLS[params.ENV]}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Check Node.js') {
            steps {
                bat 'node --version'
                bat 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: "cf-${params.ENV}-creds",
                    usernameVariable: 'APP_USERNAME',
                    passwordVariable: 'APP_PASSWORD'
                )]) {
                    script {
                        def grep = (params.SUITE == 'smoke' || params.ENV == 'prod') ? ' -- --grep @smoke' : ''
                        bat "npm test${grep}"
                    }
                }
            }
        }
    }

    post {
        always {
            junit testResults: 'test-results/junit.xml', allowEmptyResults: true
            // Needs the "HTML Publisher" plugin; adds "Playwright Report" to the build's left menu.
            publishHTML(target: [
                reportName: 'Playwright Report',
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                keepAll: true,
                alwaysLinkToLastBuild: true,
                allowMissing: true
            ])
            archiveArtifacts(
                artifacts: 'playwright-report/**,test-results/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo "Playwright tests passed on ${params.ENV}!"
        }

        failure {
            echo "Playwright pipeline failed on ${params.ENV}. Check Console Output."
        }
    }
}
