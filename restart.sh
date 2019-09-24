#!/bin/bash
sleep 1
pid="$(pidof Server)"
kill $pid
(./Server --headless &)
