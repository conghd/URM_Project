# config valid for current version and patch releases of Capistrano
lock "~> 3.17.3"


set :application, "urm"
set :repo_url, "git@github.com:conghd/CS739_Capstone_Project.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/var/www/apps/urm"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", 'config/master.key'

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "tmp/webpacker", "public/system", "vendor", "storage"
append :linked_dirs, "backend/log", "backend/public", "backend/node_modules"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
set :keep_releases, 10 

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
#set :ssh_options, { :forward_agent => true }

set :pm2_app_command, 'server.config.js'                   # the main program
set :pm2_app_name, fetch(:application)            # name for pm2 app
set :pm2_target_path, -> { "#{current_path}/backend" }         # where to run pm2 commands
set :pm2_roles, :all                              # server roles where pm2 runs on
set :pm2_env_variables, {}                        # default: env vars for pm2
set :pm2_start_params, ''                         # pm2 start params see http://pm2.keymetrics.io/docs/usage/quick-start/#cheat-sheet

namespace :deploy do
    desc 'Restart application'
    task :restart do
        #invoke 'pm2:restart'
    end

    desc 'Install dependencies'
    task :install do
        on roles(:web) do |host|
            execute "cd #{deploy_to}/current/backend && ls -la && npm install"
            #
            #
            #
            #
            # LINK node_modules
        end
    end

    after :publishing, :restart
end
