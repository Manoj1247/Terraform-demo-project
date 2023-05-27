@servers(['stage' => 'deployer@ip-172-31-52-225.us-west-2.compute.internal', 'alpha' => 'deployer@ip-172-31-51-115.us-west-2.compute.internal'])

@setup
    $repository = 'git@gitlab.com:dmecg/dashboard.git';
    $releases_dir = empty($production) ? '/var/www/stage-dashboard/releases' : '/var/www/dashboard/releases';
    $app_dir = empty($production) ? '/var/www/stage-dashboard' : '/var/www/dashboard';
    $target = empty($production) ? 'stage' : 'alpha';
    $release = date('YmdHis');
    $new_release_dir = $releases_dir .'/'. $release;
    $branch = empty($production) ? 'develop' : 'main';
@endsetup

@story('deploy', ['on' => $target])
    clone_repository
    run_composer
    build_frontend
    update_symlinks
@endstory

@task('clone_repository')
    echo "Copying repository {{ $repository }} {{ $release }} to {{ $releases_dir }}"
    git archive --remote={{ $repository }} --format=tar --prefix={{ $release }}/ {{ $branch }} | (cd {{ $releases_dir }} && tar xf -)
    echo "Changing to {{ $new_release_dir }}"
    cd {{ $new_release_dir }}
@endtask

@task('run_composer')
    echo "Starting deployment ({{ $release }})"
    cd {{ $new_release_dir }}
    composer install --ignore-platform-reqs --no-ansi --prefer-dist --no-scripts -q -o
@endtask

@task('build_frontend')
    echo 'Linking .env file'
    ln -nfs {{ $app_dir }}/.env {{ $new_release_dir }}/.env
    echo "Installing frontend ({{ $release }})"
    cd {{ $new_release_dir }}
    npm install
    echo "Building frontend"
    npm run build
@endtask

@task('update_symlinks')
    echo "Linking storage directory"
    rm -rf {{ $new_release_dir }}/storage
    ln -nfs {{ $app_dir }}/storage {{ $new_release_dir }}/storage

    #echo 'Linking fonts folder'
    #ln -nfs {{ $app_dir }}/fonts {{ $new_release_dir }}/public/fonts


    #echo 'Run migrations'
    #cd {{ $new_release_dir }}
    #php artisan migrate --force

    # echo 'Update API docs'
    # php artisan l5-swagger:generate

    echo 'Linking current release'
    ln -nfs {{ $new_release_dir }} {{ $app_dir }}/current

    # clear the config cache
    echo "Clearing config cache"
    cd {{ $new_release_dir }}
    php artisan config:clear
@endtask
