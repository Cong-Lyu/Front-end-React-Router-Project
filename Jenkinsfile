pipeline {
    agent any
    stages {
        stage('Build & Package') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Deploy to S3') {
            when {
                // 确保替换为您的实际主分支名：master 或 main
                branch 'master' 
            }
            steps {
                // 注入 AWS 凭证 (credentialsId 必须和 Jenkins 凭证 ID 匹配)
                withCredentials([string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                                 string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                        echo "正在部署到 S3 存储桶 shirahama-react-app-static..."
                        # 执行同步部署命令
                        aws s3 sync ./dist/ s3://shirahama-react-app-static/ --delete
                        echo "S3 部署完成！"
                    '''
                }
            }
        }
    }
}
