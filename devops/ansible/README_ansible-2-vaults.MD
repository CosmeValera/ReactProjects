# Ansible Vault Guide

A practical guide to using Ansible Vault for managing sensitive data in your playbooks.

---

## Installation (WSL)

Before using Ansible Vault, install Ansible in your WSL environment:

```bash
sudo apt update && sudo apt install ansible -y
```

---

## Table of Contents

- [Overview](#overview)
- [Variable Flow Architecture](#variable-flow-architecture)
- [File Structure](#file-structure)
- [Working with Vaulted Files](#working-with-vaulted-files)
- [Additional Notes](#additional-notes)

---

## Overview

Ansible Vault encrypts sensitive data (passwords, API keys, certificates) so you can safely store them in version control. This guide demonstrates how to integrate vaulted variables with Helm charts and Jinja2 templates.

---

## Variable Flow Architecture

The typical flow for managing secrets in Ansible with Helm:

```
helm_chart.yml
    ↓ calls
values-secret.yaml.j2
    ↓ references
    ├── vars/main.yml (non-sensitive variables)
    └── vars/vaulted.yml (encrypted sensitive data)
```

**How it works:**
1. `helm_chart.yml` loads both regular and vaulted variables
2. `values-secret.yaml.j2` template uses these variables
3. Ansible generates the final values file and deploys with Helm

---

## File Structure

### 1. vars/main.yml (Non-sensitive Variables)

```yaml
kubeconfig:
  path: /home/ansible/.kube
  file: config.yaml

application:
  name: my-app
  release: my-app-release

# Layout mapping for vaulted variables
vaulted:
  admin_password: "{{ admin_password }}"
  postgres_password: "{{ postgres_password }}"
```

### 2. vars/vaulted.yml (Encrypted Secrets)

**Before encryption:**
```yaml
admin_password: myAdminPassword
postgres_password: myDbPassword
```

**After encryption:**
```yaml
$ANSIBLE_VAULT;1.1;AES256
61333139373933633661656434306632616139336339346432333666613162633437316565616435
6632386239626561376436653233396137663662316135350a663430616564373037633134396636
...
```

### 3. values-secret.yaml.j2 (Jinja2 Template)

```yaml
app:
  admin:
    password: {{ vaulted.admin_password }}
  config:
    database:
      PASSWD: {{ vaulted.postgres_password }}
    server:
      DOMAIN: {{ local_domain_name }}
```

### 4. helm_chart.yml (Main Playbook)

```yaml
- name: Load vaulted vars
  include_vars:
    file: "{{ role_path }}/vars/vaulted.yml"
    name: vaulted
  no_log: true

- name: Create yaml from template
  template:
    src: values-secret.yaml.j2
    dest: /tmp/helm_values_{{ application.release }}.yaml

- name: Install application via Helm
  shell: |
    helm install {{ application.release }} oci://{{ nexus.name }}/{{ application.name }} \
      --kubeconfig {{ kubeconfig.path }}/{{ kubeconfig.file }} \
      -f /tmp/helm_values_{{ application.release }}.yaml
```

---

## Working with Vaulted Files

### Create and Encrypt a File

**Option 1: Create encrypted file directly**
```bash
ansible-vault create vars/vaulted.yml
```
Enter password, then add your secrets in the editor.

**Option 2: Encrypt an existing file**
```bash
ansible-vault encrypt vars/secrets.yml
```

### Edit a Vaulted File

View and modify encrypted content:

```bash
ansible-vault edit vars/vaulted.yml
```

### View a Vaulted File (Read-only)

```bash
ansible-vault view vars/vaulted.yml
```

### Run Playbook with Vault

```bash
# Prompt for password
ansible-playbook helm_chart.yml --ask-vault-pass

# Or use a password file
ansible-playbook helm_chart.yml --vault-password-file ~/.vault_pass
```

### Other Useful Commands

```bash
# Decrypt file permanently
ansible-vault decrypt vars/vaulted.yml

# Change vault password
ansible-vault rekey vars/vaulted.yml
```

---

## Additional Notes

### Inventory Variables

Some variables may be defined in inventory files instead of role variables. For example, `local_domain_name` might be defined at:

```
~/ansible/inventories/all.yml
```

```yaml
local_domain_name: example.com
```

This variable is then available across all hosts and can be referenced in templates as shown above.

## Quick Reference

| Command | Description |
|---------|-------------|
| `ansible-vault create <file>` | Create new encrypted file |
| `ansible-vault edit <file>` | Edit encrypted file |
| `ansible-vault view <file>` | View encrypted file (read-only) |
| `ansible-vault encrypt <file>` | Encrypt existing file |
| `ansible-vault decrypt <file>` | Decrypt file |
| `ansible-vault rekey <file>` | Change encryption password |
| `--ask-vault-pass` | Prompt for vault password |
| `--vault-password-file <file>` | Use password file for vault |

---

## Resources

- [Ansible Vault Documentation](https://docs.ansible.com/ansible/latest/user_guide/vault.html)