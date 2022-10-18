
from ec2_metadata import ec2_metadata
from flask import Flask, render_template

app = Flask(__name__)

instance_id = ec2_metadata.instance_id
ami_index = ec2_metadata.ami_launch_index
public_hostname = ec2_metadata.public_hostname
public_ipv4 = ec2_metadata.public_ipv4
local_hostname = ec2_metadata.private_hostname
local_ipv4 = ec2_metadata.private_ipv4


headers = ("Metadata", "Value")

ec2 = [
       ("instance-id",instance_id),
       ("ami-launch-index", ami_index),
       ("public-hostname", public_hostname),
       ("public-ipv4", public_ipv4),
       ("local-hostname", private_hostname),
       ("local-ipv4",private_ipv4)
     
  ]

@app.route('/')
def table():
    return render_template('table.html', headings = headers, data = ec2)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
    