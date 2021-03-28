---
title: PyRMQ, Python with RabbitMQ—simplified so you won't have to.
date: 2021-03-28
description: "Highly available systems should be the norm."
featuredImage: queue.jpg
---

## The need
Released almost a year ago, PyRMQ was created to make RabbitMQ more accessible than it is. RabbitMQ, in case you didn't know,
is an open source message broker. To summarize the technology in so little words: it's a way to manage, direct, and even contain
connections between systems or points in the form of messages. Okay, but what does that really mean? 

> Exchanges, Queues, and Messages.
 
[RabbitMQ](https://www.rabbitmq.com/) primarily works with the above three. Exchanges are bound to queues which in turn house
the messages that get sent to exchanges. Weird loop? Bear with me. All you need to know about RabbitMQ is that you take your
message (can be anything from a JSON payload, text, or even blank), pick an exchange to send it to, the exchange will direct
it to whatever queue it's bound to, and your intended recipient that is set up to listen or _consume_ from that queue will
receive it! 

Now, coming from a RESTful background, this may seem unfamiliar territory, and I agree. Since RabbitMQ follows a certain protocol,
[AMQP](https://en.wikipedia.org/wiki/Advanced_Message_Queuing_Protocol), it certainly has its own learning curve. As such,
numerous libraries attempt to abstract all these in their respective languages. The one I'll highlight in this post is
[pika](https://pypi.org/project/pika/) for Python. An already amazing library by itself, we felt that we could abstract it
further (kinda like Gatsby for React); especially since our architecture revolves around microservices—we'd be reusing all
this code to boilerplate our RabbitMQ multiple times!

> Enter, PyRMQ

With PyRMQ, it's as easy as instantiating one class!

```py
from pyrmq import Publisher
publisher = Publisher(
    exchange_name="exchange_name",
    queue_name="queue_name",
    routing_key="routing_key",
)
publisher.publish({"pyrmq": "My first message"})
```

And with that, you've already published your first message! Feel free to look over PyRMQ's
[source code](https://github.com/first-digital-finance/pyrmq) to see exactly which pika classes/methods it uses to make all
this work. 

Great, how do I receive this message then? 

```py
from pyrmq import Consumer

def callback(data):
    print(f"Received {data}!")

consumer = Consumer(
    exchange_name="exchange_name",
    queue_name="queue_name",
    routing_key="routing_key",
    callback=callback
)
consumer.start()
```

Just like that. This class launches a thread safe instance to receive your message.

As of the time of writing, PyRMQ has been battle-tested over at [FDFC](https://www.firstdigitalfinance.com/) to achieve
high availability with dealing with financial processes. Furthermore, PyRMQ is proud to hold
[100% coverage](https://codecov.io/gh/first-digital-finance/pyrmq) with its tests.

We're always looking for contributors! If you see an issue (even a typo, really), let's do something about it at
[PyRMQ's GitHub](https://github.com/first-digital-finance/pyrmq)!

Wanna learn more? Head over to [PyRMQ's documentation](https://pyrmq.readthedocs.io)!
