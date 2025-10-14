pipeline {
  agent { label 'built-in' }
  options {
    disableConcurrentBuilds() 
  }
  environment {
    msg = ": `${env.JOB_NAME}` #${env.BUILD_NUMBER}:\n(<${currentBuild.absoluteUrl}|Open>)\nBranch: ${env.BRANCH_NAME}"
    AWS_PROFILE   = credentials('aws-profile')
    INVALIDATION_PROFILE = credentials('cf-invalidation')
    DEV_BUCKET    = credentials('s3-bucket-dev-docs')
    PROD_BUCKET   = credentials('s3-bucket-prod-docs')
    DEV_CF_DIST   = credentials('cf-dist-dev-docs')
    PROD_CF_DIST  = credentials('cf-dist-prod-docs')
    SLACK_CHANNEL = credentials('slack-channel')
    DEV_URL = credentials('dev-url-docs')
    PROD_URL = credentials('prod-url-docs')
  }
  parameters {
    booleanParam(
      name: 'DEPLOY_TO_DEV',
      defaultValue: false,
      description: 'Deploy this branch to DEV?'
    )
    booleanParam(
      name: 'CLEAR_CF_CACHE',
      defaultValue: true,
      description: 'Clear CF cache?'
    )
  }
  stages {
    stage('Init') {
      steps {
        script {
          env.app_env = (env.BRANCH_NAME == "main") ? "prod" : "dev"
          env.IS_AUTO_BUILD = (env.BRANCH_NAME == 'main' || env.BRANCH_NAME == 'dev').toString()
        }
      }
    }
    stage('Send Slack Notifications') {
      when { expression { return env.IS_AUTO_BUILD.toBoolean() || params.DEPLOY_TO_DEV } }
      steps {
        script {
          slackResponse = slackSend(color: '#36a64f', message: 'Started' + " " + env.msg, channel: env.SLACK_CHANNEL )
        }
      }
    }
    stage('Install dependencies') {
      when { expression { return env.IS_AUTO_BUILD.toBoolean() || params.DEPLOY_TO_DEV } }
      steps {
        script {
          nodejs('NodeJs-22.2') {
            sh """
              npm install
            """
          }
        }
      }
    } 
    stage('Build docs') {
      when { expression { return env.IS_AUTO_BUILD.toBoolean() || params.DEPLOY_TO_DEV } }
      steps {
        script {
          if (app_env == 'dev') {
            nodejs('NodeJs-22.2') {
              sh """
                CONNECTYCUBE_URL=$DEV_URL npm run build
              """
            }
          } else {
            nodejs('NodeJs-22.2') {
              sh """
                CONNECTYCUBE_URL=$PROD_URL npm run build
              """
            }
          }
        }
      }
    }

    stage('Deploy app to prod') {
      when {
        branch 'main'
      }
      steps {
        script {
          s3Upload(
            consoleLogLevel: 'INFO',
            dontSetBuildResultOnFailure: false,
            dontWaitForConcurrentBuildCompletion: false,
            entries: [
              [
                bucket: env.PROD_BUCKET,
                excludedFile: '',
                flatten: false,
                gzipFiles: false,
                keepForever: false,
                managedArtifacts: false,
                noUploadOnFailure: true,
                selectedRegion: 'us-east-1',
                showDirectlyInBrowser: false,
                sourceFile: 'dist/**/*',
                storageClass: 'STANDARD',
                uploadFromSlave: false,
                useServerSideEncryption: false
              ]
            ],
            pluginFailureResultConstraint: 'FAILURE',
            profileName: env.AWS_PROFILE,
            userMetadata: []
          )
        }
      }
    }
    stage('Deploy app to dev') {
      when {
        anyOf {
          branch 'dev'
          expression { return params.DEPLOY_TO_DEV }
        }
      }
      steps {
        script {
          s3Upload(
            consoleLogLevel: 'INFO',
            dontSetBuildResultOnFailure: false,
            dontWaitForConcurrentBuildCompletion: false,
            entries: [
              [
                bucket: env.DEV_BUCKET,
                excludedFile: '',
                flatten: false,
                gzipFiles: false,
                keepForever: false,
                managedArtifacts: false,
                noUploadOnFailure: true,
                selectedRegion: 'us-east-1',
                showDirectlyInBrowser: false,
                sourceFile: 'dist/**/*',
                storageClass: 'STANDARD',
                uploadFromSlave: false,
                useServerSideEncryption: false
              ]
            ],
            pluginFailureResultConstraint: 'FAILURE',
            profileName: env.AWS_PROFILE,
            userMetadata: []
          )
        }
      }
    }
  }
  
  post {
    success {
      script {
        if (env.IS_AUTO_BUILD.toBoolean() || params.DEPLOY_TO_DEV) {
          if (params.CLEAR_CF_CACHE) {
            if (app_env == "dev") {
              sh """aws cloudfront create-invalidation --distribution-id $DEV_CF_DIST --paths "/*" --profile $INVALIDATION_PROFILE"""
            } else if (app_env == "prod") {
              sh """aws cloudfront create-invalidation --distribution-id $PROD_CF_DIST --paths "/*" --profile $INVALIDATION_PROFILE"""
            }
          }
          slackResponse.addReaction("white_check_mark")
        }
      }
    }
    failure {
      script {
        if (env.IS_AUTO_BUILD.toBoolean() || params.DEPLOY_TO_DEV) {
          slackResponse.addReaction("x")
        }
      }
    }
    unstable {
      script {
        if (env.IS_AUTO_BUILD.toBoolean() || params.DEPLOY_TO_DEV) {
          slackResponse.addReaction("warning")
        }
      }
    }
    aborted {
      script {
        if (env.IS_AUTO_BUILD.toBoolean() || params.DEPLOY_TO_DEV) {
          slackResponse.addReaction("no_entry_sign")
        }
      }
    }
    always { 
      cleanWs()
    }
  }
}