<?php

namespace App\Http\Controllers;

use SplObjectStorage;
use App\Models\User;
use App\Models\Message;
use Ratchet\ConnectionInterface;
use Ratchet\MessageComponentInterface;
use React\EventLoop\LoopInterface;
use Illuminate\Http\Request;

class ChatController extends Controller implements MessageComponentInterface
{
    private $loop;
    private $clients;

    /**
     * Connection construct
     * 
     * @param \React\EventLoop\LoopInterface $loop
     */
    public function __construct(LoopInterface $loop)
    {
        $this->loop = $loop;
        $this->clients = new SplObjectStorage;
    }

    /**
     * Connection on open
     * 
     * @param \Ratchet\ConnectionInterface $connection
     */
    public function onOpen(ConnectionInterface $connection)
    {
        $this->clients->attach($connection);
        echo "Client id: " . $connection->resourceId . " connected \n";
    }

    /**
     * Connection on close
     * 
     * @param \Ratchet\ConnectionInterface $connection
     */
    public function onClose(ConnectionInterface $connection)
    {
        $this->clients->detach($connection);
        echo "Client id: " . $connection->resourceId . " disconnected \n";
    }

    /**
     * Connection on error
     * 
     * @param \Ratchet\ConnectionInterface $connection
     * @param \Exception $exception
     */
    public function onError(ConnectionInterface $connection, \Exception $exception)
    {
        echo "Client id: " . $connection->resourceId . " disconnected on error: \n" . $exception->getMessage() . " \n";
        $connection->close();
    }

    /**
     * Connection on message
     * 
     * @param \Ratchet\ConnectionInterface $connection
     * @param string $data
     */
    public function onMessage(ConnectionInterface $connection, $data)
    {
        $data = json_decode($data);

        $user = User::where("api_token", "=", $data->apiToken)->first();

        switch ($data->type) {
            case "message":
                $message = Message::create([
                    "user_id" => $user->id,
                    "content" => $data->message,
                ]);

                foreach ($this->clients as $client) {
                    $client->send(json_encode([
                        "type" => $data->type,
                        "message" => $message,
                    ]));
                }

                echo "New message: " . $message->content . " from clinet id: " . $connection->resourceId . " \n";
                break;
            
            default:
                break;
        }
    }
}
