<?php

namespace App\Console\Commands;

use App\Http\Controllers\ChatController;
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;
use React\EventLoop\Factory as LoopFactory;
use React\Socket\Server as Reactor;
use Illuminate\Console\Command;

class WebSocketServer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'websocket';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start WebSocket server';

    /**
     * WebSocket host
     * 
     * @var string
     */
    protected $host = 'ws://localhost';

    /**
     * WebSocket port
     * 
     * @var int
     */
    protected $port = 8080;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        echo "WebSocket server started on $this->host:$this->port \n";

        $loop = LoopFactory::create();
        $socket = new Reactor('0.0.0.0:' . $this->port, $loop);
        $wsServer = new WsServer(new ChatController($loop));
        $server = new IoServer(new HttpServer($wsServer), $socket, $loop);
        $wsServer->enableKeepAlive($server->loop, 10);
        $server->run();
    }
}
