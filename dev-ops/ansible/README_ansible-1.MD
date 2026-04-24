# Ansible Complete Guide

A comprehensive guide to Ansible automation, covering everything from basics to advanced concepts.

## Table of Contents

- [Introduction](#introduction)
- [YAML Basics](#yaml-basics)
- [Inventory Management](#inventory-management)
- [Variables](#variables)
- [Playbooks](#playbooks)
- [Conditionals and Loops](#conditionals-and-loops)
- [Modules](#modules)
- [Handlers](#handlers)
- [Roles](#roles)
- [Collections and Galaxy](#collections-and-galaxy)
- [Jinja2 Templating](#jinja2-templating)

---

## Introduction

**Ansible** is an automation tool with the following characteristics:

- **Focused on automation** - Configuration management, application deployment, and task automation
- **YAML and Python based** - Easy to read and write
- **Agentless** - No need to install agents on target machines
- **SSH** - Uses SSH for communication
- **PUSH model** - Control node pushes configurations to managed nodes

---

## YAML Basics

### Key-Value Pair
```yaml
Fruit: Apple
Vegetable: Carrot
```

### Arrays/Lists
```yaml
Fruits:
  - Orange
  - Apple
```

### Dictionary/Map
```yaml
Banana:
  Calories: 106
  Fat: 0.4g
```

### Objects
```yaml
- Car: Toyota
  Speed: 100
```

### List of Dictionaries
```yaml
Fruits:
  - Banana:
      Calories: 106
      Fat: 0.4g
  - Grape:
      Calories: 106
      Fat: 0.4g
```

### Objects List
```yaml
Tasks:
  - name: task1
    firstStep: echo hola
  - name: task2
    firstStep: echo adios
```

---

## Inventory Management

Ansible manages multiple servers using an **inventory file** (default location: `/etc/ansible/hosts`).

### Basic Inventory (INI Format)

```ini
server1.company.com
server2.company.com

[mail]
server3.company.com
server4.company.com
```

### Using Aliases

```ini
web ansible_host=server1.company.com
```

### Inventory Parameters

- `ansible_connection` - ssh/winrm/localhost
- `ansible_port` - 22/5986
- `ansible_user` - root/administrator
- `ansible_ssh_pass` - Password (Windows: `ansible_password`)

### Full Example (INI)

```ini
# Sample Inventory File

# Web Servers
web_node1 ansible_host=web01.xyz.com ansible_connection=winrm ansible_user=administrator ansible_password=Win$Pass
web_node2 ansible_host=web02.xyz.com ansible_connection=winrm ansible_user=administrator ansible_password=Win$Pass
web_node3 ansible_host=web03.xyz.com ansible_connection=winrm ansible_user=administrator ansible_password=Win$Pass

# DB Servers
sql_db1 ansible_host=sql01.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass
sql_db2 ansible_host=sql02.xyz.com ansible_connection=ssh ansible_user=root ansible_ssh_pass=Lin$Pass

[db_nodes]
sql_db1
sql_db2

[web_nodes]
web_node1
web_node2
web_node3

[boston_nodes]
sql_db1
web_node1

[dallas_nodes]
sql_db2
web_node2
web_node3

[us_nodes:children]
boston_nodes
dallas_nodes
```

### Inventory in YAML Format

```yaml
all:
  children:
    webservers:
      children:
        webserver_us:
          hosts:
            server1_us.com:
              ansible_host: 192.168.8.101
            server2_us.com:
              ansible_host: 192.168.8.102
        webserver_eu:
          hosts:
            server1_eu.com:
              ansible_host: 10.12.0.101
            server2_eu.com:
              ansible_host: 10.12.0.102
```

---

## Variables

Variables store information that varies with each host and can be defined in:
- Inventory files
- Playbooks
- Separate variable files

### Basic Variable Usage

```yaml
- name: Add DNS server to resolv.conf
  hosts: localhost
  vars:
    dns_server: 10.1.250.10
  tasks:
    - lineinfile:
        path: /etc/resolv.conf
        line: 'nameserver {{ dns_server }}'
```

### Variable Types

- String
- Number
- Boolean
- List
- Dictionary

### Variable Precedence

**Playbook > Host > Group**

For all 22 precedence relations, see: [Ansible Variable Precedence Documentation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html#understanding-variable-precedence)

### Registering Variables

Capture task output for later use:

```yaml
---
- name: Check /etc/hosts file
  hosts: all
  tasks:
    - shell: cat /etc/hosts
      register: result
    - debug:
        var: result
```

### Verbose Mode

Increase output detail without register:

```bash
ansible-playbook -i inventory playbook.yml -v   # Options: -v, -vv, -vvv
```

### Variable Scoping

1. **Host scoped** - Variables defined for groups or hosts
2. **Play scoped** - Variables defined within a play
3. **Global scoped** - Global variables

### Magic Variables

Access variables from other hosts:

```yaml
---
- name: Print dns server
  hosts: all
  tasks:
    - debug:
        msg: '{{ hostvars["web2"].dns_server }}'
```

Common magic variables:
- `hostvars`
- `groups`
- `group_names`
- `inventory_hostname`

Two notation styles (equivalent):
1. `{{ hostvars['web2'].ansible_facts.processor }}`
2. `{{ hostvars['web2']['ansible_facts']['processor'] }}`

More info: [Magic Variables Documentation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_vars_facts.html#information-about-ansible-magic-variables)

### Ansible Facts

Facts are data about remote systems (OS, IP addresses, etc.):

```yaml
---
- name: Print hello message
  hosts: all
  tasks:
    - debug:
        var: ansible_facts
```

**Disable fact gathering:**
```yaml
gather_facts: no
```

Configuration in `/etc/ansible/ansible.cfg`:
```ini
gathering = implicit
```

More info: [Ansible Facts Documentation](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_vars_facts.html#ansible-facts)

---

## Playbooks

A playbook is a YAML file containing plays, which define tasks to run on hosts.

### Structure

- **Playbook** - YAML file
  - **Play** - Defines activities (tasks) to run on hosts
    - **Task** - An action to be performed
      - Execute a command
      - Run a script
      - Install a package
      - Shutdown/Restart

### Example Playbook

```yaml
---
- name: Play 1
  hosts: localhost
  tasks:
    - name: Execute command 'date'
      command: date
    - name: Execute script on server
      script: test_script.sh

- name: Play 2
  hosts: localhost
  tasks:
    - name: Install web service
      yum:
        name: httpd
        state: present
    - name: Start web server
      service:
        name: httpd
        state: started
```

**Note:** Order matters! Tasks execute sequentially.

### Execute Playbook

```bash
ansible-playbook <playbook.yaml>
```

### Verifying Playbooks

**Check Mode (Dry Run):**
```bash
ansible-playbook playbook.yml --check
```

**Diff Mode:**
```bash
ansible-playbook playbook.yml --diff
```

**Combined:**
```bash
ansible-playbook playbook.yml --check --diff
```

**Syntax Check:**
```bash
ansible-playbook playbook.yml --syntax-check
```

### Ansible Lint

Command-line tool for checking playbooks for errors and style issues:

```bash
ansible-lint <your_script.yml>
```

---

## Conditionals and Loops

### Conditionals

Use the `when` directive with `and`/`or` operators:

```yaml
---
- name: Install NGINX
  hosts: all
  tasks:
    - name: Install NGINX on Debian
      apt:
        name: nginx
        state: present
      when: ansible_os_family == "Debian" and
            ansible_distribution_version == "16.04"

    - name: Install NGINX on Redhat
      yum:
        name: nginx
        state: present
      when: ansible_os_family == "RedHat" or
            ansible_os_family == "SUSE"
```

### Loops with Conditionals

```yaml
---
- name: Install Softwares
  hosts: all
  vars:
    packages:
      - name: nginx
        required: True
      - name: mysql
        required: True
      - name: apache
        required: False
  tasks:
    - name: Install "{{ item.name }}" on Debian
      apt:
        name: "{{ item.name }}"
        state: present
      when: item.required == True
      loop: "{{ packages }}"
```

### Conditionals with Register

```yaml
---
- name: Check status of a service and email if its down
  hosts: localhost
  tasks:
    - name: Check HTTPD service status
      command: service httpd status
      register: result
    - name: Send email if service is down
      mail:
        to: admin@company.com
        subject: Service Alert
        body: Httpd Service is down
      when: result.stdout.find('down') != -1
```

### Conditionals with Facts

```yaml
- name: Install Nginx on ubuntu
  apt:
    name: nginx=1.18.0
    state: present
  when: ansible_facts['os_family'] == 'Debian'
```

### Conditionals with Vars

```yaml
- name: Deploy configuration files
  template:
    src: "{{ app_env }}_config.j2"
    dest: "/etc/myapp/config.conf"
  vars:
    app_env: production
```

### Basic Loops

**Without loops:**
```yaml
- name: Create users
  hosts: localhost
  tasks:
    - user: name=joe state=present
    - user: name=george state=present
    - user: name=kirian state=present
```

**With loops:**
```yaml
- name: Create users
  hosts: localhost
  tasks:
    - user: name='{{ item }}' state=present
      loop:
        - joe
        - george
        - kirian
```

### Loops with Multiple Keys

```yaml
- name: Create users
  hosts: localhost
  tasks:
    - user: name='{{ item.name }}' state=present uid='{{ item.uid }}'
      loop:
        - name: joe
          uid: 1010
        - name: george
          uid: 1011
        - name: kirian
          uid: 1012
```

### Legacy Loop Syntax (with_*)

```yaml
- name: Create users
  hosts: localhost
  tasks:
    - user: name='{{ item }}' state=present
      with_items:
        - joe
        - george
        - kirian
```

**Note:** `loop` is the modern directive and is preferred over `with_items`. Other legacy directives include: `with_file`, `with_url`, `with_mongodb`.

---

## Modules

Ansible modules are categorized by function:

- **System** - User, group, hostname
- **Commands** - Command, expect, raw
- **Files** - Acl, Archive, File, Template
- **Database** - Mongodb, Mysql, Postgresql, Vertica
- **Cloud** - Amazon, Azure, Docker, VMware
- **Windows** - Win_copy, Win_command, Win_path

### Command Module

```yaml
- name: Play 1
  hosts: localhost
  tasks:
    - name: Execute command 'date'
      command: date
    - name: Display resolv.conf contents
      command: cat /etc/resolv.conf
    - name: Display resolv.conf contents with chdir parameter
      command: cat resolv.conf chdir=/etc
    - name: Create folder, check if exists first
      command: mkdir /folder creates=/folder
```

### Script Module (Free-form)

```yaml
- name: Play 1
  hosts: localhost
  tasks:
    - name: Run a script on a remote server
      script: /some/local/script.sh -arg1 -arg2
```

### Service Module

```yaml
- name: Play 1
  hosts: localhost
  tasks:
    - name: Start the database service
      service:
        name: postgresql
        state: started
```

### Idempotency

**Why `started` instead of `start`?**

Ansible ensures idempotency:
- If service is not running → start it
- If service is already running → do nothing

Running the playbook multiple times produces the same result.

### Lineinfile Module

```yaml
- name: Add DNS server to resolv.conf
  hosts: localhost
  tasks:
    - lineinfile:
        path: /etc/resolv.conf
        line: 'nameserver 10.1.250.10'
```

This is idempotent - the line is added only once.

---

## Plugins

Plugins modify and enhance Ansible's functionality:

- **Inventory Plugin** - Dynamic inventory management
- **Module Plugin** - Extend module capabilities (e.g., AWS)
- **Action Plugin** - Load balancing, SSL certificates, health checks
- **Callback Plugin** - Hooks into execution lifecycle
- **Lookup Plugin** - Retrieve data from external sources
- **Filter Plugin** - Transform data
- **Connection Plugin** - Custom connection methods

---

## Handlers

Handlers are special tasks that run only when notified by other tasks.

### Benefits

- **Efficiency** - Actions run only when necessary
- **Readability** - Separates changes from responses
- **Idempotence** - Safe to run multiple times

### Example

```yaml
- name: Deploy Applications
  hosts: application_servers
  tasks:
    - name: Copy Application Code
      copy:
        src: app_code/
        dest: /opt/application/
      notify: Restart Application Service
  handlers:
    - name: Restart Application Service
      service:
        name: application_service
        state: restarted
```

The handler only restarts the service if the copy task makes changes.

---

## Roles

Roles organize related tasks, variables, files, and templates into reusable units.

### Benefits

- **Organize** - Keep playbooks clean and structured
- **Reuse** - Use the same role across multiple playbooks
- **Share** - Share roles with the community

### Example Role Structure

**mysql-role.yaml:**
```yaml
- name: Install and configure mysql
  hosts: db-server
  tasks:
    - name: Install pre-requisites
      yum: name=pre-req-packages state=present
    - name: Install MySQL packages
      yum: name=mysql state=present
    - name: Start MySQL Service
      service: name=mysql state=started
    - name: Configure Database
      mysql_db: name=db1 state=present
```

**Using the Role:**
```yaml
- name: Install and Configure mysql
  hosts: db_servers
  roles:
    - mysql
```

---

## Collections and Galaxy

### Ansible Galaxy

Ansible Galaxy is a hub for finding, sharing, and downloading Ansible content (roles, collections, playbooks).

**Install a collection:**
```bash
ansible-galaxy collection install network.juniper
```

### Collections

Collections are packages containing playbooks, roles, modules, and plugins.

**Using a collection:**
```yaml
---
- hosts: localhost
  collections:
    - amazon.aws
  tasks:
    - name: Launch an EC2 instance
      ec2_instance:
        name: my-instance
        region: us-west-1
```

### Requirements File

**requirements.yml:**
```yaml
---
collections:
  - name: community.general
    version: '1.0.0'
  - name: amazon.aws
    version: '1.2.1'
```

**Install from requirements:**
```bash
ansible-galaxy collection install -r requirements.yml
```

### Complete Example

```yaml
---
- hosts: localhost
  tasks:
    - name: Install the networking_tools collection
      ansible.builtin.command:
        cmd: ansible-galaxy collection install company_xyz.networking_tools

- hosts: switches
  collections:
    - company_xyz.networking_tools
  tasks:
    - name: Configure VLAN 10
      configure_vlan:
        vlan_id: 10
        vlan_name: Admin_VLAN
```

---

## Jinja2 Templating

Ansible uses Jinja2 for templating and string manipulation.

### String Manipulation

```jinja2
The name is {{ my_name }}                              # => The name is Bond
The name is {{ my_name | upper }}                      # => The name is BOND
The name is {{ my_name | lower }}                      # => The name is bond
The name is {{ my_name | title }}                      # => The name is Bond
The name is {{ my_name | replace("Bond", "Bourne") }}  # => The name is Bourne
```

### Filters

```jinja2
{{ [1, 2, 3] | min }}                    # => 1
{{ [1, 2, 3, 2] | unique }}              # => 1, 2, 3
{{ [1, 2, 3, 4] | union([4, 5]) }}       # => 1, 2, 3, 4, 5
{{ 100 | random }}                       # => Random number
```

### Loops

```jinja2
{% for number in [0, 1, 2, 3, 4] %}
  {{ number }}
{% endfor %}
```

### Conditionals

```jinja2
{% for number in [0, 1, 2, 3, 4] %}
  {% if number == 2 %}
    {{ number }}
  {% endif %}
{% endfor %}
```

---

## Additional Resources

- [Ansible Documentation](https://docs.ansible.com/)
- [Ansible Galaxy](https://galaxy.ansible.com/)
- [Variable Precedence](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_variables.html#understanding-variable-precedence)
- [Magic Variables](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_vars_facts.html#information-about-ansible-magic-variables)
- [Ansible Facts](https://docs.ansible.com/ansible/latest/playbook_guide/playbooks_vars_facts.html#ansible-facts)