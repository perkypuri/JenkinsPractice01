pipeline {
    agent any

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('FrontEnd/userpractice') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\userpractice" rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\userpractice"
                xcopy /E /I /Y "FrontEnd\\userpractice\\dist" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\userpractice"
                '''
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('BackEnd/demo') {
                    bat 'mvn clean install'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat '''
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\demo.war" del /F /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\demo.war"
                copy /Y "BackEnd\\demo\\target\\demo.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\demo.war"
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed!'
        }
    }
}
