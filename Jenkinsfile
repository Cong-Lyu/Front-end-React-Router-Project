pipeline {
    agent any
    stages {
        stage('Build & Package') {
            steps {
                // *** 核心修改部分：使用 withEnv 注入正确的 API 地址 ***
                withEnv([
                    // 必须使用您在前端代码中引用的变量名
                    'VITE_REACT_APP_API_URL=http://Kobe-env.eba-gqgq4w7c.ap-southeast-2.elasticbeanstalk.com'
                ]) {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Deploy to S3') {
            when {
                branch 'master'
            }
            steps {
                // 注入 AWS 凭证 (保持不变)
                withCredentials([string(credentialsId: 'aws-access-key-id', variable: 'AWS_ACCESS_KEY_ID'),
                                 string(credentialsId: 'aws-secret-key', variable: 'AWS_SECRET_ACCESS_KEY')]) {
                    sh '''
                        echo "正在部署到 S3 存储桶 shirahama-react-app-static..."
                        aws s3 sync ./dist/ s3://shirahama-react-app-static/ --delete
                        echo "S3 部署完成！"
                    '''
                }
            }
        }
    }
}
