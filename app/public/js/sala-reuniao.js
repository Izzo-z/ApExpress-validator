// ========== SALA DE REUNIÃO JAVASCRIPT ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MEETING TYPE SELECTOR ==========
    const meetingTypeBtns = document.querySelectorAll('.meeting-type-btn');
    
    meetingTypeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            meetingTypeBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update meeting type in UI
            const type = this.dataset.type;
            updateMeetingType(type);
        });
    });
    
    function updateMeetingType(type) {
        const participantName = document.querySelector('.participant-name');
        const meetingInfo = document.querySelector('.meeting-details');
        
        switch(type) {
            case 'interview':
                participantName.textContent = 'Ana Vicente está esperando';
                updateMeetingDetails('Entrevista', '30 minutos', '2', 'Sala privada');
                break;
            case 'meeting':
                participantName.textContent = 'Equipe está esperando';
                updateMeetingDetails('Reunião de Equipe', '60 minutos', '5', 'Sala compartilhada');
                break;
            case 'presentation':
                participantName.textContent = 'Audiência está esperando';
                updateMeetingDetails('Apresentação', '45 minutos', '10', 'Sala pública');
                break;
        }
    }
    
    function updateMeetingDetails(title, duration, participants, privacy) {
        const details = document.querySelectorAll('.detail-item span');
        if (details.length >= 3) {
            details[0].textContent = `Duração: ${duration}`;
            details[1].textContent = `Participantes: ${participants}`;
            details[2].textContent = privacy;
        }
    }
    
    // ========== VIDEO CONTROLS ==========
    const controlBtns = document.querySelectorAll('.control-btn');
    
    controlBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (btn.classList.contains('camera-btn') || btn.classList.contains('mic-btn')) {
                btn.classList.toggle('active');
                
                // Update button appearance based on state
                const icon = btn.querySelector('i');
                if (btn.classList.contains('camera-btn')) {
                    if (btn.classList.contains('active')) {
                        icon.className = 'fas fa-video';
                        btn.title = 'Desligar câmera';
                    } else {
                        icon.className = 'fas fa-video-slash';
                        btn.title = 'Ligar câmera';
                    }
                } else if (btn.classList.contains('mic-btn')) {
                    if (btn.classList.contains('active')) {
                        icon.className = 'fas fa-microphone';
                        btn.title = 'Desligar microfone';
                    } else {
                        icon.className = 'fas fa-microphone-slash';
                        btn.title = 'Ligar microfone';
                    }
                }
            } else if (btn.classList.contains('screen-btn')) {
                // Screen share toggle
                btn.classList.toggle('active');
                const icon = btn.querySelector('i');
                if (btn.classList.contains('active')) {
                    icon.className = 'fas fa-desktop';
                    btn.title = 'Parar compartilhamento';
                    showNotification('Compartilhamento de tela iniciado');
                } else {
                    icon.className = 'fas fa-desktop';
                    btn.title = 'Compartilhar tela';
                    showNotification('Compartilhamento de tela parado');
                }
            }
        });
    });
    
    // ========== ACTION BUTTONS ==========
    const joinBtn = document.querySelector('.btn-join');
    const scheduleBtn = document.querySelector('.btn-schedule');
    const inviteBtn = document.querySelector('.btn-invite');
    
    joinBtn?.addEventListener('click', function() {
        showNotification('Entrando na reunião...', 'success');
        setTimeout(() => {
            // Simulate joining meeting
            document.querySelector('.participant-name').textContent = 'Reunião iniciada!';
            joinBtn.textContent = 'Sair da Reunião';
            joinBtn.style.background = '#dc3545';
        }, 2000);
    });
    
    scheduleBtn?.addEventListener('click', function() {
        openModal();
    });
    
    inviteBtn?.addEventListener('click', function() {
        copyMeetingLink();
    });
    
    // ========== MODAL FUNCTIONALITY ==========
    const modal = document.getElementById('meetingModal');
    const closeModal = document.getElementById('closeModal');
    const cancelBtn = document.querySelector('.btn-modal-cancel');
    const confirmBtn = document.querySelector('.btn-modal-confirm');
    
    function openModal() {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModalFunc() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    closeModal?.addEventListener('click', closeModalFunc);
    cancelBtn?.addEventListener('click', closeModalFunc);
    
    // Close modal on backdrop click
    modal?.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModalFunc();
        }
    });
    
    confirmBtn?.addEventListener('click', function() {
        const meetingName = document.querySelector('input[type="text"]').value;
        const meetingDate = document.querySelector('input[type="datetime-local"]').value;
        const participants = document.querySelector('input[type="email"]').value;
        
        if (meetingName && meetingDate) {
            showNotification('Reunião agendada com sucesso!', 'success');
            closeModalFunc();
            // Clear form
            document.querySelector('input[type="text"]').value = '';
            document.querySelector('input[type="datetime-local"]').value = '';
            document.querySelector('input[type="email"]').value = '';
        } else {
            showNotification('Preencha todos os campos obrigatórios', 'error');
        }
    });
    
    // ========== QUICK SETTINGS ==========
    const checkboxes = document.querySelectorAll('.setting-label input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.parentElement.textContent.trim();
            const isChecked = this.checked;
            
            if (label.includes('Câmera')) {
                const cameraBtn = document.querySelector('.camera-btn');
                if (isChecked) {
                    cameraBtn.classList.add('active');
                } else {
                    cameraBtn.classList.remove('active');
                }
            } else if (label.includes('Microfone')) {
                const micBtn = document.querySelector('.mic-btn');
                if (isChecked) {
                    micBtn.classList.add('active');
                } else {
                    micBtn.classList.remove('active');
                }
            }
        });
    });
    
    // ========== UTILITY FUNCTIONS ==========
    function showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function copyMeetingLink() {
        const meetingLink = 'https://apice.com/meeting/abc123';
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(meetingLink).then(() => {
                showNotification('Link da reunião copiado!', 'success');
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = meetingLink;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showNotification('Link da reunião copiado!', 'success');
        }
    }
    
    // ========== PARTICIPANT STATUS SIMULATION ==========
    function simulateParticipantActivity() {
        const participantStatuses = document.querySelectorAll('.participant-status');
        
        setInterval(() => {
            participantStatuses.forEach(status => {
                if (status.textContent === 'Aguardando') {
                    if (Math.random() > 0.7) {
                        status.textContent = 'Online';
                        status.className = 'participant-status ready';
                    }
                }
            });
        }, 5000);
    }
    
    // Start participant simulation
    simulateParticipantActivity();
    
    // ========== MEETING CARDS INTERACTION ==========
    const meetingCards = document.querySelectorAll('.meeting-card');
    
    meetingCards.forEach(card => {
        card.addEventListener('click', function() {
            const meetingTitle = this.querySelector('h4').textContent;
            showNotification(`Abrindo detalhes: ${meetingTitle}`, 'info');
        });
    });
    
    // ========== ANIMATIONS ==========
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        
        .control-btn:active {
            animation: pulse 0.2s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Sala de Reunião inicializada com sucesso!');
});